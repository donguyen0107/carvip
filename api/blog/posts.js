// API endpoint: GET /api/blog/posts — lấy tất cả bài viết
//               POST /api/blog/posts — tạo/cập nhật bài viết

const { getPosts, savePosts } = require('../../lib/redis');

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // ── GET: trả về tất cả bài ──────────────────────────────────────
        if (req.method === 'GET') {
            const posts = await getPosts();
            return res.status(200).json(posts);
        }

        // ── POST: tạo mới hoặc cập nhật bài ────────────────────────────
        if (req.method === 'POST') {
            const body = req.body || {};
            const { id, title, slug, content, excerpt, category, image, status, author } = body;

            if (!title) {
                return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề bài viết' });
            }

            const posts = await getPosts();

            // Tạo slug từ tiêu đề nếu chưa có
            let finalSlug = slug;
            if (!finalSlug && title) {
                finalSlug = title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
            }

            // Đảm bảo slug không bị trùng
            let uniqueSlug = finalSlug;
            let counter = 1;
            while (posts.some(p => p.slug === uniqueSlug && p.id !== id)) {
                uniqueSlug = `${finalSlug}-${counter++}`;
            }

            // Lấy excerpt từ content nếu chưa có
            const cleanExcerpt = excerpt || (content || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...';

            const existingIndex = id ? posts.findIndex(p => p.id === id) : -1;

            if (existingIndex !== -1) {
                // Cập nhật bài cũ
                posts[existingIndex] = {
                    ...posts[existingIndex],
                    title,
                    slug: uniqueSlug,
                    content: content || '',
                    excerpt: cleanExcerpt,
                    category: category || 'tin-tuc',
                    image: image || '',
                    status: status || 'draft',
                    author: author || 'Admin',
                    updatedAt: new Date().toISOString()
                };
                await savePosts(posts);
                return res.status(200).json({
                    success: true,
                    message: 'Cập nhật bài viết thành công',
                    post: posts[existingIndex]
                });
            } else {
                // Tạo bài mới
                const newPost = {
                    id: id || Date.now().toString(),
                    title,
                    slug: uniqueSlug,
                    content: content || '',
                    excerpt: cleanExcerpt,
                    category: category || 'tin-tuc',
                    image: image || '',
                    status: status || 'draft',
                    author: author || 'Admin',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                posts.unshift(newPost);
                await savePosts(posts);
                return res.status(201).json({
                    success: true,
                    message: 'Đăng bài viết thành công',
                    post: newPost
                });
            }
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('❌ /api/blog/posts error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server: ' + error.message,
            error: error.message
        });
    }
}
