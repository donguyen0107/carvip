// API endpoint: GET /api/blog/posts/[id] — lấy 1 bài
//               PUT /api/blog/posts/[id] — sửa bài
//               DELETE /api/blog/posts/[id] — xóa bài

const { getPosts, savePosts } = require('../../../lib/redis');

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

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Thiếu post ID' });
    }

    try {
        const posts = await getPosts();

        // ── GET: lấy 1 bài theo id ──────────────────────────────────────
        if (req.method === 'GET') {
            const post = posts.find(p => p.id === id || p.slug === id);
            if (!post) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            }
            return res.status(200).json(post);
        }

        // ── PUT: cập nhật bài ───────────────────────────────────────────
        if (req.method === 'PUT') {
            const postIndex = posts.findIndex(p => p.id === id);
            if (postIndex === -1) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            }
            const body = req.body || {};
            posts[postIndex] = {
                ...posts[postIndex],
                ...body,
                id, // giữ nguyên id
                updatedAt: new Date().toISOString()
            };
            await savePosts(posts);
            return res.status(200).json({
                success: true,
                message: 'Cập nhật bài viết thành công',
                post: posts[postIndex]
            });
        }

        // ── DELETE: xóa bài ─────────────────────────────────────────────
        if (req.method === 'DELETE') {
            const postIndex = posts.findIndex(p => p.id === id);
            if (postIndex === -1) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            }
            const filtered = posts.filter(p => p.id !== id);
            await savePosts(filtered);
            return res.status(200).json({ success: true, message: 'Xóa bài viết thành công' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('❌ /api/blog/posts/[id] error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server: ' + error.message,
            error: error.message
        });
    }
}
