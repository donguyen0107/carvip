// ===== GITHUB STORAGE - Lưu bài viết trên GitHub =====
// Thay LocalStorage bằng GitHub để chia sẻ dữ liệu

class GitHubStorage {
    constructor(config) {
        this.owner = config.owner;           // Username GitHub của bạn
        this.repo = config.repo;             // Tên repository
        this.branch = config.branch || 'main';
        this.token = config.token;           // Personal Access Token
        this.filePath = 'posts.json';        // File lưu bài viết
        this.apiBase = 'https://api.github.com';
    }

    // Lấy tất cả bài viết
    async getPosts() {
        try {
            // Thử đọc từ GitHub
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
            // Fallback về LocalStorage
            return JSON.parse(localStorage.getItem('blogPosts') || '[]');
        }
    }

    // Lưu bài viết lên GitHub
    async savePosts(posts) {
        if (!this.token) {
            console.warn('⚠️ Chưa có GitHub token, lưu vào LocalStorage');
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            return true;
        }

        try {
            // Lấy SHA của file hiện tại (cần để update)
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
                // Backup vào LocalStorage
                localStorage.setItem('blogPosts', JSON.stringify(posts));
                return true;
            } else {
                throw new Error('Failed to save to GitHub');
            }
        } catch (error) {
            console.error('❌ Lỗi khi lưu lên GitHub:', error);
            // Fallback về LocalStorage
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            return false;
        }
    }

    // Lấy SHA của file (cần để update)
    async getFileSHA() {
        try {
            const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${this.filePath}?ref=${this.branch}`;
            const response = await fetch(url, {
                headers: this.token ? {
                    'Authorization': `token ${this.token}`
                } : {}
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
            const url = `${this.apiBase}/repos/${this.owner}/${this.repo}`;
            const response = await fetch(url, {
                headers: this.token ? {
                    'Authorization': `token ${this.token}`
                } : {}
            });
            
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Export để dùng ở file khác
window.GitHubStorage = GitHubStorage;
