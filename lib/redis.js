// Redis client dùng ioredis với REDIS_URL (Redis Labs / redislabs.com)
// Mỗi serverless invocation tạo kết nối mới, đảm bảo connected trước khi dùng

const Redis = require('ioredis');

function createClient() {
    const url = process.env.REDIS_URL;
    if (!url) {
        throw new Error('Thiếu biến môi trường REDIS_URL trong Vercel Dashboard!');
    }

    return new Redis(url, {
        // rediss:// cần TLS, redis:// thì không
        tls: url.startsWith('rediss://') ? {} : undefined,
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        lazyConnect: true,       // Không tự kết nối, ta gọi connect() thủ công
        connectTimeout: 10000,
        commandTimeout: 10000,
        family: 0,
        retryStrategy(times) {
            if (times > 3) return null;
            return Math.min(times * 200, 2000);
        }
    });
}

// Thực thi một tác vụ Redis rồi disconnect
async function withRedis(fn) {
    const redis = createClient();
    await redis.connect();
    try {
        return await fn(redis);
    } finally {
        redis.disconnect();
    }
}

async function getPosts() {
    return withRedis(async (redis) => {
        const raw = await redis.get('blog-posts');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : (parsed.posts || parsed.data || []);
        } catch (e) {
            console.error('getPosts parse error:', e.message);
            return [];
        }
    });
}

async function savePosts(posts) {
    return withRedis(async (redis) => {
        await redis.set('blog-posts', JSON.stringify(posts));
        return true;
    });
}

module.exports = { withRedis, getPosts, savePosts };
