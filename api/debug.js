// Debug endpoint — kiểm tra Redis + test POST
// https://your-project.vercel.app/api/debug

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    const info = {
        timestamp: new Date().toISOString(),
        env: {
            REDIS_URL: process.env.REDIS_URL
                ? '✅ CÓ (' + process.env.REDIS_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') + ')'
                : '❌ THIẾU',
        },
        redisTest: null,
        posts: null,
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
            lazyConnect: true,
            connectTimeout: 8000,
            commandTimeout: 8000,
            family: 0,
        });

        await redis.connect();
        info.redisTest = await redis.ping() === 'PONG' ? '✅ PONG' : '❌ No PONG';

        // Đọc blog posts
        const raw = await redis.get('blog-posts');
        if (raw) {
            const posts = JSON.parse(raw);
            const arr = Array.isArray(posts) ? posts : [];
            info.posts = {
                total: arr.length,
                published: arr.filter(p => p.status === 'published').length,
                draft: arr.filter(p => p.status === 'draft').length,
                titles: arr.map(p => `[${p.status}] ${p.title}`)
            };
        } else {
            info.posts = 'Chưa có dữ liệu blog-posts trong Redis';
        }

        redis.disconnect();
    } catch (err) {
        info.error = err.message + '\n' + (err.stack || '');
    }

    return res.status(200).json(info);
};
