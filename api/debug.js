// Debug endpoint — MỞ URL này để kiểm tra trạng thái Redis
// https://your-vercel-url.vercel.app/api/debug

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    const info = {
        timestamp: new Date().toISOString(),
        env: {
            KV_REST_API_URL: process.env.KV_REST_API_URL ? '✅ CÓ (' + process.env.KV_REST_API_URL.substring(0, 30) + '...)' : '❌ THIẾU',
            KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? '✅ CÓ (***' + process.env.KV_REST_API_TOKEN.slice(-4) + ')' : '❌ THIẾU',
            UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? '✅ CÓ' : '❌ KHÔNG CÓ',
            UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? '✅ CÓ' : '❌ KHÔNG CÓ',
            REDIS_URL: process.env.REDIS_URL ? '✅ CÓ' : '❌ KHÔNG CÓ',
        },
        redisTest: null,
        postCount: null,
        error: null
    };

    try {
        const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!url || !token) {
            info.error = 'Thiếu KV_REST_API_URL hoặc KV_REST_API_TOKEN';
            return res.status(200).json(info);
        }

        // Test ping
        const pingRes = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(['PING'])
        });
        const pingData = await pingRes.json();
        info.redisTest = pingData.result === 'PONG' ? '✅ PONG - Kết nối thành công!' : '⚠️ ' + JSON.stringify(pingData);

        // Test get blog-posts
        const getRes = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(['GET', 'blog-posts'])
        });
        const getData = await getRes.json();
        if (getData.result) {
            try {
                const posts = typeof getData.result === 'string'
                    ? JSON.parse(getData.result)
                    : getData.result;
                info.postCount = '✅ Có ' + (Array.isArray(posts) ? posts.length : '?') + ' bài viết trong Redis';
            } catch (e) {
                info.postCount = '⚠️ Lỗi parse: ' + e.message;
            }
        } else {
            info.postCount = '⚠️ Chưa có dữ liệu blog-posts trong Redis (result=null)';
        }

    } catch (err) {
        info.error = err.message;
    }

    return res.status(200).json(info);
};
