// Debug endpoint — kiểm tra Redis connection
// Mở: https://your-project.vercel.app/api/debug

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    const info = {
        timestamp: new Date().toISOString(),
        env: {
            REDIS_URL: process.env.REDIS_URL
                ? '✅ CÓ (' + process.env.REDIS_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') + ')'
                : '❌ THIẾU',
            KV_REST_API_URL: process.env.KV_REST_API_URL ? '✅ CÓ' : '❌ KHÔNG CÓ',
            KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? '✅ CÓ' : '❌ KHÔNG CÓ',
        },
        redisTest: null,
        postCount: null,
        error: null
    };

    try {
        const Redis = require('ioredis');
        const url = process.env.REDIS_URL;
        if (!url) throw new Error('REDIS_URL không được cấu hình');

        const redis = new Redis(url, {
            tls: url.startsWith('rediss://') ? {} : undefined,
            maxRetriesPerRequest: 3,
            enableReadyCheck: false,
            lazyConnect: false,
            connectTimeout: 8000,
            commandTimeout: 8000,
            family: 0,
        });

        // PING
        const ping = await redis.ping();
        info.redisTest = ping === 'PONG' ? '✅ PONG - Kết nối thành công!' : '⚠️ ' + ping;

        // Đọc blog posts
        const raw = await redis.get('blog-posts');
        if (raw) {
            const posts = JSON.parse(raw);
            info.postCount = '✅ Có ' + (Array.isArray(posts) ? posts.length : '?') + ' bài trong Redis';
        } else {
            info.postCount = 'ℹ️ Chưa có dữ liệu blog-posts (Redis key rỗng — bình thường nếu chưa đăng bài)';
        }

        redis.disconnect();
    } catch (err) {
        info.error = err.message;
    }

    return res.status(200).json(info);
};
