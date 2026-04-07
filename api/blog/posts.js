// API endpoint for blog posts on Vercel
// Path: /api/blog/posts
// Methods: GET (all posts), POST (create new post)

const { getRedisClient } = require('../../lib/redis');

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Cache-Control, Pragma');
    
    // Set Cache-Control headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const redis = getRedisClient();
        await redis.connect().catch(() => {}); // Connect if not connected

        // GET - Lấy tất cả posts
        if (req.method === 'GET') {
            const postsData = await redis.get('blog-posts');
            let posts = [];
            if (postsData) {
                try {
                    const parsed = JSON.parse(postsData);
                    posts = Array.isArray(parsed) ? parsed : (parsed.posts || parsed.data || []);
                } catch(e) {
                    posts = [];
                }
            }
            
            // Return array directly (not wrapped in object)
            return res.status(200).json(posts);
        }

        // POST - Tạo post mới hoặc cập nhật
        if (req.method === 'POST') {
            const { id, title, slug, content, excerpt, category, image, status, author } = req.body;

            // Validation
            if (!title || !content) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and content are required'
                });
            }

            // Lấy danh sách hiện tại
            const postsData = await redis.get('blog-posts');
            let posts = [];
            if (postsData) {
                try {
                    const parsed = JSON.parse(postsData);
                    posts = Array.isArray(parsed) ? parsed : (parsed.posts || parsed.data || []);
                } catch(e) {
                    posts = [];
                }
            }

            // Generate slug if not provided
            let finalSlug = slug;
            if (!finalSlug) {
                finalSlug = title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
            }

            // Ensure unique slug
            let uniqueSlug = finalSlug;
            let counter = 1;
            while (posts.some(p => p.slug === uniqueSlug && p.id !== id)) {
                uniqueSlug = `${finalSlug}-${counter}`;
                counter++;
            }

            // Check if updating existing post
            const existingIndex = posts.findIndex(p => p.id === id);
            
            if (existingIndex !== -1) {
                // Update existing post
                posts[existingIndex] = {
                    ...posts[existingIndex],
                    title,
                    slug: uniqueSlug,
                    content,
                    excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                    category: category || 'tin-tuc',
                    image: image || '',
                    status: status || 'draft',
                    author: author || 'Admin',
                    updatedAt: new Date().toISOString()
                };
            } else {
                // Create new post
                const post = {
                    id: id || Date.now().toString(),
                    title,
                    slug: uniqueSlug,
                    content,
                    excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                    category: category || 'tin-tuc',
                    image: image || '',
                    status: status || 'draft',
                    author: author || 'Admin',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                // Thêm vào đầu danh sách
                posts.unshift(post);
            }

            // Lưu vào Redis
            await redis.set('blog-posts', JSON.stringify(posts));

            return res.status(201).json({
                success: true,
                message: existingIndex !== -1 ? 'Post updated successfully' : 'Post created successfully',
                post: posts[existingIndex !== -1 ? existingIndex : 0]
            });
        }

        // Method not allowed
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
