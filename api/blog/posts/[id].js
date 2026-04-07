// API: GET    /api/blog/posts/[id] — lấy 1 bài
//      PUT    /api/blog/posts/[id] — sửa bài
//      DELETE /api/blog/posts/[id] — xóa bài

const Redis = require('ioredis');

function createRedis() {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error('Thiếu REDIS_URL trong Vercel Environment Variables!');
    return new Redis(url, {
        tls: url.startsWith('rediss://') ? {} : undefined,
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        lazyConnect: true,
        connectTimeout: 10000,
        commandTimeout: 10000,
        family: 0,
        retryStrategy: (t) => t > 3 ? null : Math.min(t * 200, 2000)
    });
}

async function getPosts(redis) {
    const raw = await redis.get('blog-posts');
    if (!raw) return [];
    try {
        const p = JSON.parse(raw);
        return Array.isArray(p) ? p : (p.posts || p.data || []);
    } catch { return []; }
}

async function savePosts(redis, posts) {
    await redis.set('blog-posts', JSON.stringify(posts));
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: 'Thiếu post ID' });

    const redis = createRedis();
    try {
        await redis.connect();
        const posts = await getPosts(redis);

        // ── GET ──────────────────────────────────────────────────────────
        if (req.method === 'GET') {
            const post = posts.find(p => p.id === id || p.slug === id);
            if (!post) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            return res.status(200).json(post);
        }

        // ── PUT ──────────────────────────────────────────────────────────
        if (req.method === 'PUT') {
            const idx = posts.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            posts[idx] = { ...posts[idx], ...(req.body || {}), id, updatedAt: new Date().toISOString() };
            await savePosts(redis, posts);
            return res.status(200).json({ success: true, message: 'Cập nhật thành công', post: posts[idx] });
        }

        // ── DELETE ───────────────────────────────────────────────────────
        if (req.method === 'DELETE') {
            const idx = posts.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            const filtered = posts.filter(p => p.id !== id);
            await savePosts(redis, filtered);
            return res.status(200).json({ success: true, message: 'Xóa bài viết thành công' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('❌ /api/blog/posts/[id] error:', error.message);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    } finally {
        redis.disconnect();
    }
};
