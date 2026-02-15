// ===== VERCEL STORAGE - Lưu bài viết trên Vercel KV =====
// Không cần GitHub, viết bài trực tiếp trên web

class VercelStorage {
    constructor(config) {
        // API endpoint của Vercel
        this.apiUrl = config.apiUrl || '/api/posts';
        this.isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    }

    // Lấy tất cả bài viết
    async getPosts() {
        try {
            console.log('📥 Đang tải bài viết từ Vercel KV...');
            
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const posts = await response.json();
            console.log('✅ Đã tải', posts.length, 'bài viết từ Vercel KV');
            
            // Backup vào LocalStorage
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            
            return posts;
        } catch (error) {
            console.error('❌ Lỗi khi tải từ Vercel:', error);
            
            // Fallback về LocalStorage
            const cached = localStorage.getItem('blogPosts');
            if (cached) {
                console.log('⚠️ Dùng dữ liệu cache từ LocalStorage');
                return JSON.parse(cached);
            }
            
            return [];
        }
    }

    // Lưu bài viết mới
    async createPost(post) {
        try {
            console.log('📤 Đang tạo bài viết mới...');
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Đã tạo bài viết:', result.post.title);
            
            // Cập nhật cache
            const posts = await this.getPosts();
            
            return true;
        } catch (error) {
            console.error('❌ Lỗi khi tạo bài viết:', error);
            
            // Fallback: Lưu vào LocalStorage
            const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
            posts.unshift({
                ...post,
                id: post.id || Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            console.log('⚠️ Đã lưu vào LocalStorage (offline)');
            
            return false;
        }
    }

    // Cập nhật bài viết
    async updatePost(id, updatedData) {
        try {
            console.log('📤 Đang cập nhật bài viết...');
            
            const response = await fetch(`${this.apiUrl}?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Đã cập nhật bài viết');
            
            return true;
        } catch (error) {
            console.error('❌ Lỗi khi cập nhật:', error);
            return false;
        }
    }

    // Xóa bài viết
    async deletePost(id) {
        try {
            console.log('🗑️ Đang xóa bài viết...');
            
            const response = await fetch(`${this.apiUrl}?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP ${response.status}`);
            }

            console.log('✅ Đã xóa bài viết');
            return true;
        } catch (error) {
            console.error('❌ Lỗi khi xóa:', error);
            return false;
        }
    }

    // Lưu tất cả bài viết (để tương thích với code cũ)
    async savePosts(posts) {
        try {
            console.log('📤 Đang lưu', posts.length, 'bài viết...');
            
            // Lưu từng bài một
            for (const post of posts) {
                // Luôn tạo mới (không cần check ID)
                // Vì khi viết bài mới, bài chưa có trên Redis
                await this.createPost(post);
            }
            
            console.log('✅ Đã lưu tất cả bài viết');
            return true;
        } catch (error) {
            console.error('❌ Lỗi khi lưu:', error);
            
            // Fallback
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            return false;
        }
    }

    // Test kết nối
    async testConnection() {
        try {
            const response = await fetch(this.apiUrl);
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Export
window.VercelStorage = VercelStorage;
