// Redis client dùng ioredis với REDIS_URL
// Biến env đang có: REDIS_URL (kết nối TCP/TLS tới Upstash Redis)

const Redis = require('ioredis');

let _client = null;

function getClient() {
    if (_client && _client.status === 'ready') return _client;

    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        throw new Error('Thiếu biến môi trường REDIS_URL trong Vercel Dashboard!');
    }

    _client = new Redis(redisUrl, {
        tls: redisUrl.startsWith('rediss://') ? {} : undefined,
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        lazyConnect: false,
        connectTimeout: 10000,
        commandTimeout: 10000,
        family: 0,
        retryStrategy(times) {
            if (times > 3) return null;
            return Math.min(times * 200, 2000);
        }
    });

    _client.on('error', (err) => {
        console.error('Redis error:', err.message);
    });

    return _client;
}

async function getPosts() {
    const r = getClient();
    const raw = await r.get('blog-posts');
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : (parsed.posts || parsed.data || []);
    } catch (e) {
        console.error('getPosts parse error:', e.message);
        return [];
    }
}

async function savePosts(posts) {
    const r = getClient();
    await r.set('blog-posts', JSON.stringify(posts));
    return true;
}

module.exports = { getClient, getPosts, savePosts };
