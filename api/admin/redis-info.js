// Admin Redis utilities
// GET  /api/admin/redis-info  — xem dung lượng Redis
// POST /api/admin/redis-info  — xóa toàn bộ blog posts để giải phóng bộ nhớ

const Redis = require('ioredis');

function createRedis() {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error('Thiếu REDIS_URL');
    return new Redis(url, {
        tls: url.startsWith('rediss://') ? {} : undefined,
        maxRetriesPerRequest: 3, enableReadyCheck: false,
        lazyConnect: true, connectTimeout: 8000, family: 0,
    });
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    const redis = createRedis();
    try {
        await redis.connect();

        if (req.method === 'GET') {
            // Lấy thông tin memory
            const info = await redis.info('memory');
            const usedMatch = info.match(/used_memory_human:(.+)/);
            const maxMatch = info.match(/maxmemory_human:(.+)/);
            const policyMatch = info.match(/maxmemory_policy:(.+)/);

            const raw = await redis.get('blog-posts');
            let postsInfo = { count: 0, sizeKB: 0, posts: [] };
            if (raw) {
                const arr = JSON.parse(raw);
                postsInfo = {
                    count: arr.length,
                    sizeKB: Math.round(raw.length / 1024),
                    posts: arr.map(p => ({
                        id: p.id,
                        title: p.title,
                        status: p.status,
                        contentSizeKB: Math.round((p.content || '').length / 1024),
                        hasBase64Image: (p.image || '').startsWith('data:image') || (p.content || '').includes('data:image')
                    }))
                };
            }

            return res.status(200).json({
                memory: {
                    used: usedMatch ? usedMatch[1].trim() : 'N/A',
                    max: maxMatch ? maxMatch[1].trim() : 'N/A',
                    policy: policyMatch ? policyMatch[1].trim() : 'N/A',
                },
                blogPosts: postsInfo,
                tip: 'Nếu bộ nhớ đầy, dùng POST /api/admin/redis-info với body {"action":"clear"} để xóa dữ liệu cũ'
            });
        }

        if (req.method === 'POST') {
            const { action } = req.body || {};

            if (action === 'clear') {
                await redis.del('blog-posts');
                return res.status(200).json({ success: true, message: 'Đã xóa toàn bộ blog posts khỏi Redis!' });
            }

            if (action === 'set-empty') {
                await redis.set('blog-posts', '[]');
                return res.status(200).json({ success: true, message: 'Đã reset blog posts về mảng rỗng' });
            }

            return res.status(400).json({ success: false, message: 'action phải là "clear" hoặc "set-empty"' });
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    } finally {
        redis.disconnect();
    }
};
