// API: GET    /api/blog/posts/[id] — lấy 1 bài
//      PUT    /api/blog/posts/[id] — sửa bài   (cần auth)
//      DELETE /api/blog/posts/[id] — xóa bài   (cần auth)

const Redis = require('ioredis');

// TTL 10 năm — tránh eviction trên Upstash free
const TTL = 10 * 365 * 24 * 60 * 60;

// ─── Redis client ─────────────────────────────────────────────────────────────
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

// ─── Lấy tất cả bài ──────────────────────────────────────────────────────────
async function getPosts(redis) {
    const indexRaw = await redis.get('posts:index');
    if (indexRaw) {
        try {
            const ids = JSON.parse(indexRaw);
            if (Array.isArray(ids) && ids.length > 0) {
                const values = await redis.mget(...ids.map(id => `post:${id}`));
                const posts = values.map(v => {
                    if (!v) return null;
                    try { return JSON.parse(v); } catch { return null; }
                }).filter(Boolean);
                redis.expire('posts:index', TTL).catch(() => {});
                return posts;
            }
        } catch { /* fallback */ }
    }
    const raw = await redis.get('blog-posts');
    if (!raw) return [];
    try {
        const p = JSON.parse(raw);
        return Array.isArray(p) ? p : (p.posts || p.data || []);
    } catch {
        throw new Error('Redis data corrupted. Please check manually.');
    }
}

// ─── Lưu 1 bài vào key riêng + cập nhật index ────────────────────────────────
async function saveOnePost(redis, post) {
    const pipeline = redis.pipeline();
    pipeline.set(`post:${post.id}`, JSON.stringify(post), 'EX', TTL);
    const indexRaw = await redis.get('posts:index');
    let ids = [];
    if (indexRaw) { try { ids = JSON.parse(indexRaw); } catch { ids = []; } }
    if (!ids.includes(post.id)) ids.unshift(post.id);
    pipeline.set('posts:index', JSON.stringify(ids), 'EX', TTL);
    await pipeline.exec();
}

// ─── Xóa 1 bài khỏi key riêng + index ───────────────────────────────────────
async function deleteOnePost(redis, postId) {
    const pipeline = redis.pipeline();
    pipeline.del(`post:${postId}`);
    const indexRaw = await redis.get('posts:index');
    if (indexRaw) {
        try {
            const ids = JSON.parse(indexRaw).filter(id => id !== postId);
            pipeline.set('posts:index', JSON.stringify(ids), 'EX', TTL);
        } catch { /* ignore */ }
    }
    await pipeline.exec();
}

// ─── Backup blob ──────────────────────────────────────────────────────────────
async function updateBlobBackup(redis, posts) {
    try { await redis.set('blog-posts', JSON.stringify(posts), 'EX', TTL); }
    catch (e) { console.error('updateBlobBackup error:', e.message); }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function isAuthorized(req) {
    const auth = req.headers['authorization'] || '';
    if (!auth.startsWith('Bearer ')) return false;
    const token = auth.slice(7);
    if (!token) return false;
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        return decoded.split(':')[0] === (process.env.ADMIN_USERNAME || 'admin');
    } catch { return false; }
}

// ─── CORS ─────────────────────────────────────────────────────────────────────
function setCors(res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
}

// ─── Handler ──────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
    setCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: 'Thiếu post ID' });

    const redis = createRedis();
    try {
        await redis.connect();
        const posts = await getPosts(redis);

        // ── GET ───────────────────────────────────────────────────────────────
        if (req.method === 'GET') {
            const post = posts.find(p => p.id === id || p.slug === id);
            if (!post) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
            return res.status(200).json(post);
        }

        // ── PUT ───────────────────────────────────────────────────────────────
        if (req.method === 'PUT') {
            if (!isAuthorized(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const idx = posts.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });

            const updatedPost = { ...posts[idx], ...(req.body || {}), id, updatedAt: new Date().toISOString() };
            await saveOnePost(redis, updatedPost);
            posts[idx] = updatedPost;
            updateBlobBackup(redis, posts);

            return res.status(200).json({ success: true, message: 'Cập nhật thành công', post: updatedPost });
        }

        // ── DELETE ────────────────────────────────────────────────────────────
        if (req.method === 'DELETE') {
            if (!isAuthorized(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const idx = posts.findIndex(p => p.id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });

            await deleteOnePost(redis, id);
            const filtered = posts.filter(p => p.id !== id);
            updateBlobBackup(redis, filtered);

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
