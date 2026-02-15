// API endpoint for blog posts on Vercel
// Path: /api/blog/posts
// Methods: GET (all posts), POST (create new post)

import { kv } from '@vercel/kv';

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

    try {
        // GET - Lấy tất cả posts
        if (req.method === 'GET') {
            const postsData = await kv.get('blog-posts');
            const posts = postsData || [];
            
            return res.status(200).json({
                success: true,
                posts: posts
            });
        }

        // POST - Tạo post mới
        if (req.method === 'POST') {
            const { title, content, excerpt, coverImage, status, author } = req.body;

            // Validation
            if (!title || !content) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and content are required'
                });
            }

            // Lấy danh sách hiện tại
            const postsData = await kv.get('blog-posts');
            const posts = postsData || [];

            // Tạo post mới
            const post = {
                id: Date.now().toString(),
                title,
                content,
                excerpt: excerpt || content.substring(0, 150) + '...',
                coverImage: coverImage || '',
                status: status || 'draft',
                author: author || 'Admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Thêm vào đầu danh sách
            posts.unshift(post);

            // Lưu vào KV
            await kv.set('blog-posts', posts);

            return res.status(201).json({
                success: true,
                message: 'Post created successfully',
                post: post
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
