// Redis helper dùng Upstash REST API qua fetch thuần túy
// Không cần npm package — chỉ cần 2 biến env:
//   KV_REST_API_URL   (hoặc UPSTASH_REDIS_REST_URL)
//   KV_REST_API_TOKEN (hoặc UPSTASH_REDIS_REST_TOKEN)

function getConfig() {
    const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').trim();
    const token = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
    if (!url || !token) {
        throw new Error(
            'Thiếu biến môi trường Redis!\n' +
            'Cần có: KV_REST_API_URL và KV_REST_API_TOKEN trong Vercel Environment Variables.'
        );
    }
    return { url, token };
}

// Gửi lệnh Redis qua REST API
async function redisCmd(...args) {
    const { url, token } = getConfig();
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Redis HTTP ${res.status}: ${text}`);
    }
    const json = await res.json();
    if (json.error) {
        throw new Error(`Redis error: ${json.error}`);
    }
    return json.result;
}

// Lấy danh sách bài viết
async function getPosts() {
    const raw = await redisCmd('GET', 'blog-posts');
    if (!raw) return [];
    try {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return Array.isArray(parsed) ? parsed : (parsed.posts || parsed.data || []);
    } catch (e) {
        console.error('getPosts parse error:', e.message);
        return [];
    }
}

// Lưu danh sách bài viết
async function savePosts(posts) {
    await redisCmd('SET', 'blog-posts', JSON.stringify(posts));
    return true;
}

module.exports = { redisCmd, getPosts, savePosts };
