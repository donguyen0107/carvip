// API endpoint để CRUD bài viết trên Vercel
// Sử dụng Vercel KV (Redis) để lưu trữ

import { kv } from '@vercel/kv';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    // GET - Lấy tất cả bài viết
    if (req.method === 'GET') {
      const posts = await kv.get('blog_posts') || [];
      return res.status(200).json(posts);
    }

    // POST - Tạo bài viết mới
    if (req.method === 'POST') {
      const newPost = req.body;
      
      // Validate
      if (!newPost.title || !newPost.content) {
        return res.status(400).json({ 
          error: 'Thiếu tiêu đề hoặc nội dung' 
        });
      }

      // Lấy danh sách hiện tại
      const posts = await kv.get('blog_posts') || [];
      
      // Thêm bài mới
      const post = {
        id: newPost.id || Date.now().toString(),
        title: newPost.title,
        slug: newPost.slug || newPost.title.toLowerCase().replace(/ /g, '-'),
        excerpt: newPost.excerpt || '',
        category: newPost.category || 'tin-tuc',
        image: newPost.image || '',
        content: newPost.content,
        status: newPost.status || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      posts.unshift(post);
      
      // Lưu vào KV
      await kv.set('blog_posts', posts);
      
      return res.status(201).json({ 
        success: true, 
        post 
      });
    }

    // PUT - Cập nhật bài viết
    if (req.method === 'PUT') {
      const { id } = req.query;
      const updatedData = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Thiếu ID bài viết' });
      }

      const posts = await kv.get('blog_posts') || [];
      const index = posts.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({ error: 'Không tìm thấy bài viết' });
      }

      // Cập nhật
      posts[index] = {
        ...posts[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      await kv.set('blog_posts', posts);

      return res.status(200).json({ 
        success: true, 
        post: posts[index] 
      });
    }

    // DELETE - Xóa bài viết
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Thiếu ID bài viết' });
      }

      const posts = await kv.get('blog_posts') || [];
      const newPosts = posts.filter(p => p.id !== id);

      if (posts.length === newPosts.length) {
        return res.status(404).json({ error: 'Không tìm thấy bài viết' });
      }

      await kv.set('blog_posts', newPosts);

      return res.status(200).json({ 
        success: true, 
        message: 'Đã xóa bài viết' 
      });
    }

    // Method không hợp lệ
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
