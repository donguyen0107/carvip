// ===== GITHUB STORAGE - BẢN BẢO MẬT =====
// Token KHÔNG được lưu trong code, phải nhập mỗi lần dùng

class GitHubStorageSecure {
    constructor(config) {
        this.owner = config.owner;
        this.repo = config.repo;
        this.branch = config.branch || 'main';
        this.filePath = 'posts.json';
        this.apiBase = 'https://api.github.com';
        
        // Token sẽ được lưu trong sessionStorage (chỉ tồn tại trong phiên làm việc)
        // Khi đóng browser sẽ mất, phải nhập lại
        this.token = sessionStorage.getItem('github_token') || '';
    }

    // Lấy token từ sessionStorage hoặc prompt
    async ensureToken() {
        if (!this.token) {
            this.token = sessionStorage.getItem('github_token');
        }
        
        if (!this.token) {
            // Hiện popup nhập token
            const token = prompt(
                '🔑 Nhập GitHub Personal Access Token:\n\n' +
                '• Token sẽ chỉ lưu trong phiên làm việc này\n' +
                '• Đóng browser sẽ phải nhập lại\n' +
                '• Token KHÔNG bao giờ được commit lên GitHub\n\n' +
                'Nhập token của bạn:'
            );
            
            if (!token) {
                throw new Error('Cần token để lưu bài lên GitHub');
            }
            
            // Kiểm tra token có hợp lệ không
            const isValid = await this.validateToken(token);
            if (!isValid) {
                alert('❌ Token không hợp lệ! Vui lòng kiểm tra lại.');
                throw new Error('Token không hợp lệ');
            }
            
            // Lưu vào sessionStorage
            sessionStorage.setItem('github_token', token);
            this.token = token;
            
            alert('✅ Token hợp lệ! Đã lưu vào phiên làm việc.');
        }
        
        return this.token;
    }

    // Kiểm tra token có hợp lệ không
    async validateToken(token) {
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Xóa token khỏi session
    clearToken() {
        sessionStorage.removeItem('github_token');
        this.token = '';
    }

    // Lấy tất cả bài viết (KHÔNG cần token)
    async getPosts() {
        try {
            const url = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${this.filePath}`;
            const response = await fetch(url);
            
            if (response.ok) {
                const posts = await response.json();
                console.log('✅ Đã tải bài viết từ GitHub');
                return posts;
            } else {
                console.log('⚠️ Chưa có file posts.json trên GitHub');
                return [];
            }
        } catch (error) {
            console.error('❌ Lỗi khi tải từ GitHub:', error);
            return JSON.parse(localStorage.getItem('blogPosts') || '[]');
        }
    }

    // Lưu bài viết lên GitHub (CẦN token)
    async savePosts(posts) {
        try {
            // Đảm bảo có token
            await this.ensureToken();
            
            // Lấy SHA của file hiện tại
            const sha = await this.getFileSHA();
            
            // Chuẩn bị dữ liệu
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(posts, null, 2))));
            
            // Push lên GitHub
            const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${this.filePath}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Update blog posts - ${new Date().toLocaleString('vi-VN')}`,
                    content: content,
                    branch: this.branch,
                    sha: sha
                })
            });

            if (response.ok) {
                console.log('✅ Đã lưu bài viết lên GitHub');
                localStorage.setItem('blogPosts', JSON.stringify(posts));
                return true;
            } else {
                const error = await response.json();
                console.error('❌ Lỗi GitHub API:', error);
                
                // Nếu token hết hạn hoặc không hợp lệ
                if (response.status === 401 || response.status === 403) {
                    this.clearToken();
                    alert('❌ Token không hợp lệ hoặc đã hết hạn. Vui lòng nhập lại.');
                    // Thử lại với token mới
                    return await this.savePosts(posts);
                }
                
                throw new Error('Failed to save to GitHub');
            }
        } catch (error) {
            console.error('❌ Lỗi khi lưu lên GitHub:', error);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            return false;
        }
    }

    // Lấy SHA của file
    async getFileSHA() {
        try {
            await this.ensureToken();
            
            const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${this.filePath}?ref=${this.branch}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.sha;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    // Kiểm tra kết nối GitHub
    async testConnection() {
        try {
            await this.ensureToken();
            
            const url = `${this.apiBase}/repos/${this.owner}/${this.repo}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Export
window.GitHubStorageSecure = GitHubStorageSecure;
