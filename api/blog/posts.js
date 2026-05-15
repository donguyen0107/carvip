// API: GET  /api/blog/posts  — lấy tất cả bài viết
//      POST /api/blog/posts  — tạo / cập nhật bài viết (cần auth)

const { getPosts, saveOnePost, savePosts } = require('../../lib/redis');

// ─── Auth helper ─────────────────────────────────────────────────────────────
function isAuthorized(req) {
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
    if (!ADMIN_TOKEN) return true; // Nếu chưa cấu hình token, cho qua (backward compat)
    const auth = req.headers['authorization'] || '';
    return auth === `Bearer ${ADMIN_TOKEN}`;
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

    // ── GET ───────────────────────────────────────────────────────────────────
    if (req.method === 'GET') {
        try {
            const posts = await getPosts();
            return res.status(200).json(posts);
        } catch (error) {
            console.error('❌ GET /api/blog/posts error:', error.message);
            return res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
        }
    }

    // ── POST (tạo mới hoặc cập nhật) ─────────────────────────────────────────
    if (req.method === 'POST') {
        if (!isAuthorized(req)) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        try {
            const body = req.body || {};
            const { id, title, slug, content, excerpt, category, image, status, author } = body;

            if (!title) {
                return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề bài viết' });
            }

            // Kiểm tra kích thước content (giới hạn 200KB để tránh OOM Redis)
            const contentSize = (content || '').length;
            if (contentSize > 200 * 1024) {
                return res.status(413).json({
                    success: false,
                    message: `Nội dung bài viết quá lớn (${Math.round(contentSize / 1024)}KB). Giới hạn là 200KB. Hãy dùng URL ảnh thay vì upload ảnh trực tiếp.`
                });
            }

            // Xóa base64 images trong content (rất nặng)
            const cleanContent = (content || '').replace(/src="data:image\/[^;]+;base64,[^"]+"/g,
                'src="[ảnh đã xóa - dùng URL ảnh thay vì base64]"');

            // Nếu featured image là base64, không lưu vào Redis
            const safeImage = (image || '').startsWith('data:image') ? '' : (image || '');

            // Lấy danh sách bài hiện tại để check slug trùng
            const posts = await getPosts();

            // Tạo slug
            let finalSlug = slug || title
                .toLowerCase().normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
                .replace(/-+/g, '-').trim() || 'bai-viet';

            let uniqueSlug = finalSlug, counter = 1;
            while (posts.some(p => p.slug === uniqueSlug && p.id !== id)) {
                uniqueSlug = `${finalSlug}-${counter++}`;
            }

            const cleanExcerpt = excerpt || (content || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...';
            const postId = id || Date.now().toString();
            const existing = posts.find(p => p.id === postId);

            const updatedPost = {
                ...(existing || {}),
                id: postId,
                title,
                slug: uniqueSlug,
                content: cleanContent,
                excerpt: cleanExcerpt,
                category: category || 'tin-tuc',
                image: safeImage,
                status: status || 'draft',
                author: author || 'Admin',
                createdAt: existing ? existing.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Dùng saveOnePost: chỉ ghi 1 key riêng + cập nhật index → không đụng đến bài khác
            await saveOnePost(updatedPost);

            // Đồng thời cập nhật blob backup (blog-posts) để đồng bộ
            const updatedAll = existing
                ? posts.map(p => p.id === postId ? updatedPost : p)
                : [updatedPost, ...posts];
            // Chạy background, không block response
            savePosts(updatedAll).catch(e => console.error('savePosts background error:', e.message));

            const isNew = !existing;
            return res.status(isNew ? 201 : 200).json({
                success: true,
                message: isNew ? 'Đăng bài viết thành công' : 'Cập nhật bài viết thành công',
                post: updatedPost
            });

        } catch (error) {
            console.error('❌ POST /api/blog/posts error:', error.message);
            return res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
};
