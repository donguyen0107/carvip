// Redis client dùng @upstash/redis cho Vercel
// Biến môi trường đang có trong Vercel Dashboard:
//   KV_REST_API_URL   — URL của Vercel KV / Upstash
//   KV_REST_API_TOKEN — Token xác thực

const { Redis } = require('@upstash/redis');

let _redis = null;

function getRedis() {
    if (_redis) return _redis;

    const url   = process.env.KV_REST_API_URL
               || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN
               || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        throw new Error(
            'Thiếu biến môi trường Redis!\n' +
            'Kiểm tra trong Vercel Dashboard > Settings > Environment Variables:\n' +
            '  KV_REST_API_URL\n' +
            '  KV_REST_API_TOKEN'
        );
    }

    _redis = new Redis({ url, token });
    return _redis;
}

async function getPosts() {
    const r = getRedis();
    // @upstash/redis tự động parse JSON
    const data = await r.get('blog-posts');
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : (parsed.posts || []);
        } catch {
            return [];
        }
    }
    return data.posts || data.data || [];
}

async function savePosts(posts) {
    const r = getRedis();
    // @upstash/redis set nhận array/object trực tiếp, tự serialize JSON
    await r.set('blog-posts', posts);
    return true;
}

module.exports = { getRedis, getPosts, savePosts };
