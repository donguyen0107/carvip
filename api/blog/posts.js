// API: GET /api/blog/posts  — lấy tất cả bài viết
//      POST /api/blog/posts — tạo/cập nhật bài viết

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

    const redis = createRedis();
    try {
        await redis.connect();

        // ── GET ─────────────────────────────────────────────────────────
        if (req.method === 'GET') {
            const posts = await getPosts(redis);
            return res.status(200).json(posts);
        }

        // ── POST (tạo mới hoặc cập nhật) ────────────────────────────────
        if (req.method === 'POST') {
            const body = req.body || {};
            const { id, title, slug, content, excerpt, category, image, status, author } = body;

            if (!title) {
                return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề bài viết' });
            }

            const posts = await getPosts(redis);

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
            const existingIndex = id ? posts.findIndex(p => p.id === id) : -1;

            if (existingIndex !== -1) {
                posts[existingIndex] = {
                    ...posts[existingIndex], title, slug: uniqueSlug,
                    content: content || '', excerpt: cleanExcerpt,
                    category: category || 'tin-tuc', image: image || '',
                    status: status || 'draft', author: author || 'Admin',
                    updatedAt: new Date().toISOString()
                };
                await savePosts(redis, posts);
                return res.status(200).json({ success: true, message: 'Cập nhật bài viết thành công', post: posts[existingIndex] });
            } else {
                const newPost = {
                    id: id || Date.now().toString(), title, slug: uniqueSlug,
                    content: content || '', excerpt: cleanExcerpt,
                    category: category || 'tin-tuc', image: image || '',
                    status: status || 'draft', author: author || 'Admin',
                    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
                };
                posts.unshift(newPost);
                await savePosts(redis, posts);
                return res.status(201).json({ success: true, message: 'Đăng bài viết thành công', post: newPost });
            }
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('❌ /api/blog/posts error:', error.message);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    } finally {
        redis.disconnect();
    }
};
