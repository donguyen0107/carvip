// API: GET  /api/blog/posts  — lấy tất cả bài viết
//      POST /api/blog/posts  — tạo / cập nhật bài viết (cần auth)

const Redis = require('ioredis');

// TTL 10 năm (giây) — tránh eviction trên Upstash free
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

// ─── Lấy tất cả bài: ưu tiên index riêng, fallback về blob cũ ────────────────
async function getPosts(redis) {
    // Thử đọc index mới trước (post:{id} keys)
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
                // Gia hạn TTL index mỗi lần đọc
                redis.expire('posts:index', TTL).catch(() => {});
                return posts;
            }
        } catch { /* tiếp tục fallback */ }
    }
    // Fallback: blob cũ blog-posts
    const raw = await redis.get('blog-posts');
    if (!raw) return [];
    try {
        const p = JSON.parse(raw);
        return Array.isArray(p) ? p : (p.posts || p.data || []);
    } catch {
        // KHÔNG return [] để tránh ghi đè mất dữ liệu
        throw new Error('Redis data corrupted. Please check manually.');
    }
}

// ─── Lưu 1 bài vào key riêng + cập nhật index + backup blob ──────────────────
async function saveOnePost(redis, post) {
    const pipeline = redis.pipeline();
    // 1. Key riêng cho bài này
    pipeline.set(`post:${post.id}`, JSON.stringify(post), 'EX', TTL);

    // 2. Cập nhật index
    const indexRaw = await redis.get('posts:index');
    let ids = [];
    if (indexRaw) { try { ids = JSON.parse(indexRaw); } catch { ids = []; } }
    if (!ids.includes(post.id)) ids.unshift(post.id);
    pipeline.set('posts:index', JSON.stringify(ids), 'EX', TTL);

    await pipeline.exec();
}

// ─── Cập nhật blob backup (chạy background, không block response) ─────────────
async function updateBlobBackup(redis, posts) {
    try {
        await redis.set('blog-posts', JSON.stringify(posts), 'EX', TTL);
    } catch (e) {
        console.error('updateBlobBackup error:', e.message);
    }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
// Token từ /api/admin/login là base64("admin:timestamp")
function isAuthorized(req) {
    const auth = req.headers['authorization'] || '';
    if (!auth.startsWith('Bearer ')) return false;
    const token = auth.slice(7);
    if (!token) return false;
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const username = decoded.split(':')[0];
        return username === (process.env.ADMIN_USERNAME || 'admin');
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

    const redis = createRedis();
    try {
        await redis.connect();

        // ── GET ───────────────────────────────────────────────────────────────
        if (req.method === 'GET') {
            const posts = await getPosts(redis);
            return res.status(200).json(posts);
        }

        // ── POST ──────────────────────────────────────────────────────────────
        if (req.method === 'POST') {
            if (!isAuthorized(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const body = req.body || {};
            const { id, title, slug, content, excerpt, category, image, status, author } = body;

            if (!title) {
                return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề bài viết' });
            }

            // Giới hạn 200KB tránh OOM
            if ((content || '').length > 200 * 1024) {
                return res.status(413).json({
                    success: false,
                    message: `Nội dung quá lớn (${Math.round((content||'').length/1024)}KB). Giới hạn 200KB. Hãy dùng URL ảnh thay vì base64.`
                });
            }

            // Xóa base64 trong content
            const cleanContent = (content || '').replace(
                /src="data:image\/[^;]+;base64,[^"]+"/g,
                'src="[ảnh đã xóa - dùng URL ảnh]"'
            );
            const safeImage = (image || '').startsWith('data:image') ? '' : (image || '');

            const posts = await getPosts(redis);

            // Tạo slug duy nhất
            let baseSlug = slug || title
                .toLowerCase().normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
                .replace(/-+/g, '-').trim() || 'bai-viet';
            let finalSlug = baseSlug, counter = 1;
            while (posts.some(p => p.slug === finalSlug && p.id !== id)) {
                finalSlug = `${baseSlug}-${counter++}`;
            }

            const cleanExcerpt = excerpt || (content || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...';
            const postId = id || Date.now().toString();
            const existing = posts.find(p => p.id === postId);

            const updatedPost = {
                ...(existing || {}),
                id: postId, title, slug: finalSlug,
                content: cleanContent, excerpt: cleanExcerpt,
                category: category || 'tin-tuc', image: safeImage,
                status: status || 'draft', author: author || 'Admin',
                createdAt: existing ? existing.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Lưu key riêng
            await saveOnePost(redis, updatedPost);

            // Backup blob (background)
            const updatedAll = existing
                ? posts.map(p => p.id === postId ? updatedPost : p)
                : [updatedPost, ...posts];
            updateBlobBackup(redis, updatedAll); // không await

            return res.status(existing ? 200 : 201).json({
                success: true,
                message: existing ? 'Cập nhật bài viết thành công' : 'Đăng bài viết thành công',
                post: updatedPost
            });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('❌ /api/blog/posts error:', error.message);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    } finally {
        redis.disconnect();
    }
};
