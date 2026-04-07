// Redis client cho Vercel + Upstash Redis
// Dùng @upstash/redis (chuẩn cho Vercel Marketplace Redis / Upstash)
// Biến môi trường cần thiết (cấu hình trong Vercel Dashboard):
//   UPSTASH_REDIS_REST_URL   (hoặc KV_REST_API_URL)
//   UPSTASH_REDIS_REST_TOKEN (hoặc KV_REST_API_TOKEN)

let redis = null;

function getRedis() {
    if (redis) return redis;

    const url = process.env.UPSTASH_REDIS_REST_URL
        || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
        || process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
        throw new Error(
            'Thiếu biến môi trường Redis!\n' +
            'Vào Vercel Dashboard > Project > Settings > Environment Variables và thêm:\n' +
            '  UPSTASH_REDIS_REST_URL\n' +
            '  UPSTASH_REDIS_REST_TOKEN'
        );
    }

    const { Redis } = require('@upstash/redis');
    redis = new Redis({ url, token });
    return redis;
}

async function getPosts() {
    const r = getRedis();
    // @upstash/redis tự động parse JSON khi dùng .get()
    const data = await r.get('blog-posts');
    if (!data) return [];
    // Nếu trả về đã là array (auto-parsed), dùng luôn
    if (Array.isArray(data)) return data;
    // Nếu trả về string, parse thủ công
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : (parsed.posts || []);
        } catch {
            return [];
        }
    }
    // Object wrapper
    return data.posts || data.data || [];
}

async function savePosts(posts) {
    const r = getRedis();
    // Lưu array trực tiếp — @upstash/redis tự serialize JSON
    await r.set('blog-posts', posts);
    return true;
}

module.exports = { getRedis, getPosts, savePosts };
