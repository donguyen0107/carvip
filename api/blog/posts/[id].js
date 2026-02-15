// API endpoint for single blog post on Vercel
// Path: /api/blog/posts/[id]
// Methods: GET (single post), PUT (update), DELETE (delete)

const { getRedisClient } = require('../../../lib/redis');

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Post ID is required'
        });
    }

    try {
        const redis = getRedisClient();
        await redis.connect().catch(() => {}); // Connect if not connected

        // Lấy tất cả posts
        const postsData = await redis.get('blog-posts');
        const posts = postsData ? JSON.parse(postsData) : [];

        // GET - Lấy 1 post theo ID
        if (req.method === 'GET') {
            const post = posts.find(p => p.id === id);
            
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            return res.status(200).json({
                success: true,
                post: post
            });
        }

        // PUT - Cập nhật post
        if (req.method === 'PUT') {
            const { title, content, excerpt, coverImage, status, author } = req.body;

            const postIndex = posts.findIndex(p => p.id === id);
            
            if (postIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            // Cập nhật post
            posts[postIndex] = {
                ...posts[postIndex],
                title: title || posts[postIndex].title,
                content: content || posts[postIndex].content,
                excerpt: excerpt || posts[postIndex].excerpt,
                coverImage: coverImage !== undefined ? coverImage : posts[postIndex].coverImage,
                status: status || posts[postIndex].status,
                author: author || posts[postIndex].author,
                updatedAt: new Date().toISOString()
            };

            // Cập nhật trong Redis
            await redis.set('blog-posts', JSON.stringify(posts));

            return res.status(200).json({
                success: true,
                message: 'Post updated successfully',
                post: posts[postIndex]
            });
        }

        // DELETE - Xóa post
        if (req.method === 'DELETE') {
            const postIndex = posts.findIndex(p => p.id === id);
            
            if (postIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            // Xóa post
            const filteredPosts = posts.filter(p => p.id !== id);

            // Lưu lại
            await redis.set('blog-posts', JSON.stringify(filteredPosts));

            return res.status(200).json({
                success: true,
                message: 'Post deleted successfully'
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
