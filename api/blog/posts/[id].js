// API: GET    /api/blog/posts/[id] — lấy 1 bài
//      PUT    /api/blog/posts/[id] — sửa bài   (cần auth)
//      DELETE /api/blog/posts/[id] — xóa bài   (cần auth)

const { getPosts, saveOnePost, savePosts, deleteOnePost } = require('../../../lib/redis');

// ─── Auth helper ─────────────────────────────────────────────────────────────
// Token được tạo bởi /api/admin/login dạng base64("admin:timestamp")
// Chỉ cần decode và check username đúng là đủ
function isAuthorized(req) {
    const auth = req.headers['authorization'] || '';
    if (!auth.startsWith('Bearer ')) return false;
    const token = auth.slice(7);
    if (!token) return false;
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const username = decoded.split(':')[0];
        const validUser = process.env.ADMIN_USERNAME || 'admin';
        return username === validUser;
    } catch {
        return false;
    }
}

// ─── CORS headers ─────────────────────────────────────────────────────────────
function setCors(res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
}

module.exports = async function handler(req, res) {
    setCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: 'Thiếu post ID' });

    try {
        // ── GET ──────────────────────────────────────────────────────────────
        if (req.method === 'GET') {
            const posts = await getPosts();
            const post = posts.find(p => p.id === id || p.slug === id);
            if (!post) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            return res.status(200).json(post);
        }

        // ── PUT ──────────────────────────────────────────────────────────────
        if (req.method === 'PUT') {
            if (!isAuthorized(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const posts = await getPosts();
            const idx = posts.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });

            const updatedPost = {
                ...posts[idx],
                ...(req.body || {}),
                id,
                updatedAt: new Date().toISOString()
            };

            // Lưu key riêng trước
            await saveOnePost(updatedPost);

            // Cập nhật blob backup
            posts[idx] = updatedPost;
            savePosts(posts).catch(e => console.error('savePosts backup error:', e.message));

            return res.status(200).json({ success: true, message: 'Cập nhật thành công', post: updatedPost });
        }

        // ── DELETE ───────────────────────────────────────────────────────────
        if (req.method === 'DELETE') {
            if (!isAuthorized(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const posts = await getPosts();
            const idx = posts.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });

            // Xóa key riêng + cập nhật index
            await deleteOnePost(id);

            // Cập nhật blob backup
            const filtered = posts.filter(p => p.id !== id);
            savePosts(filtered).catch(e => console.error('savePosts backup error:', e.message));

            return res.status(200).json({ success: true, message: 'Xóa bài viết thành công' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('❌ /api/blog/posts/[id] error:', error.message);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
};
