// ===== SIMPLE CMS SERVER FOR LUXURY CAR RENTAL =====
// Server đơn giản để quản lý nội dung website

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ===== CẤU HÌNH Cơ BẢN =====
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('.')); // Phục vụ tất cả file tĩnh

// Mật khẩu admin đơn giản (trong thực tế nên dùng database và mã hóa)
const ADMIN_PASSWORD = 'admin123'; // ⚠️ ĐỔI MẬT KHẨU NÀY!

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// In-memory storage for blog posts (trong thực tế nên dùng database)
let blogPosts = [];

// ===== CẤU HÌNH UPLOAD ẢNH =====
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './'); // Lưu ảnh vào thư mục gốc
    },
    filename: function (req, file, cb) {
        // Giữ nguyên tên file hoặc tạo tên mới
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn 10MB
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận ảnh
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
    }
});

// ===== API: ĐĂNG NHẬP ADMIN =====
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Tạo token đơn giản (trong thực tế nên dùng JWT)
        const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
        res.json({ 
            success: true, 
            message: 'Đăng nhập thành công!',
            token: token
        });
    } else {
        res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }
});

// ===== MIDDLEWARE: XÁC THỰC TOKEN =====
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Không có quyền truy cập!' });
    }
    
    // Kiểm tra token đơn giản
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        if (decoded.startsWith(ADMIN_CREDENTIALS.username)) {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Token không hợp lệ!' });
        }
    } catch (error) {
        res.status(403).json({ success: false, message: 'Token không hợp lệ!' });
    }
}

// ===== API: LẤY DANH SÁCH BÀI VIẾT =====
app.get('/api/blog/posts', async (req, res) => {
    try {
        const { status, slug } = req.query;
        
        // Đọc posts từ file
        try {
            const data = await fs.readFile(path.join(__dirname, 'blog-posts.json'), 'utf8');
            blogPosts = JSON.parse(data);
        } catch (e) {
            // File chưa tồn tại, khởi tạo mảng rỗng
            blogPosts = [];
        }
        
        let filteredPosts = blogPosts;
        
        // Lọc theo slug
        if (slug) {
            filteredPosts = filteredPosts.filter(post => post.slug === slug);
        }
        
        // Lọc theo status
        if (status) {
            filteredPosts = filteredPosts.filter(post => post.status === status);
        }
        
        // Sắp xếp theo thời gian cập nhật (mới nhất trước)
        filteredPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        
        res.json(filteredPosts);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi đọc bài viết: ' + error.message 
        });
    }
});

// ===== API: LẤY CHI TIẾT MỘT BÀI VIẾT =====
app.get('/api/blog/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Đọc posts từ file
        try {
            const data = await fs.readFile(path.join(__dirname, 'blog-posts.json'), 'utf8');
            blogPosts = JSON.parse(data);
        } catch (e) {
            blogPosts = [];
        }
        
        const post = blogPosts.find(p => p.id === id);
        
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy bài viết!' });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi đọc bài viết: ' + error.message 
        });
    }
});

// ===== API: TẠO HOẶC CẬP NHẬT BÀI VIẾT =====
app.post('/api/blog/posts', authenticateToken, async (req, res) => {
    try {
        const postData = req.body;
        
        // Đọc posts từ file
        try {
            const data = await fs.readFile(path.join(__dirname, 'blog-posts.json'), 'utf8');
            blogPosts = JSON.parse(data);
        } catch (e) {
            blogPosts = [];
        }
        
        // Tìm xem post đã tồn tại chưa
        const existingIndex = blogPosts.findIndex(p => p.id === postData.id);
        
        if (existingIndex >= 0) {
            // Cập nhật post hiện có
            blogPosts[existingIndex] = postData;
        } else {
            // Thêm post mới
            blogPosts.push(postData);
        }
        
        // Lưu vào file
        await fs.writeFile(
            path.join(__dirname, 'blog-posts.json'), 
            JSON.stringify(blogPosts, null, 2), 
            'utf8'
        );
        
        res.json({ 
            success: true, 
            message: 'Lưu bài viết thành công!',
            post: postData
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi lưu bài viết: ' + error.message 
        });
    }
});

// ===== API: XÓA BÀI VIẾT =====
app.delete('/api/blog/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Đọc posts từ file
        try {
            const data = await fs.readFile(path.join(__dirname, 'blog-posts.json'), 'utf8');
            blogPosts = JSON.parse(data);
        } catch (e) {
            blogPosts = [];
        }
        
        // Lọc bỏ post cần xóa
        const filteredPosts = blogPosts.filter(p => p.id !== id);
        
        if (filteredPosts.length === blogPosts.length) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết!' });
        }
        
        blogPosts = filteredPosts;
        
        // Lưu vào file
        await fs.writeFile(
            path.join(__dirname, 'blog-posts.json'), 
            JSON.stringify(blogPosts, null, 2), 
            'utf8'
        );
        
        res.json({ 
            success: true, 
            message: 'Xóa bài viết thành công!'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi xóa bài viết: ' + error.message 
        });
    }
});

// ===== API: LẤY NỘI DUNG FILE HTML =====
app.get('/api/content/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join(__dirname, filename);
        
        // Kiểm tra file có tồn tại không
        const content = await fs.readFile(filepath, 'utf8');
        res.json({ success: true, content: content });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Không tìm thấy file!' });
    }
});

// ===== API: CẬP NHẬT NỘI DUNG FILE HTML =====
app.post('/api/content/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const { content, password } = req.body;
        
        // Kiểm tra mật khẩu
        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
        }
        
        const filepath = path.join(__dirname, filename);
        
        // Backup file cũ trước khi ghi đè
        const backupPath = path.join(__dirname, 'backups', `${filename}.backup-${Date.now()}`);
        await fs.mkdir(path.join(__dirname, 'backups'), { recursive: true });
        
        try {
            const oldContent = await fs.readFile(filepath, 'utf8');
            await fs.writeFile(backupPath, oldContent, 'utf8');
        } catch (e) {
            console.log('Không thể tạo backup:', e.message);
        }
        
        // Ghi nội dung mới
        await fs.writeFile(filepath, content, 'utf8');
        
        res.json({ 
            success: true, 
            message: 'Cập nhật thành công!',
            backup: backupPath
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi lưu file: ' + error.message 
        });
    }
});

// ===== API: UPLOAD ẢNH =====
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const { password } = req.body;
        
        // Kiểm tra mật khẩu
        if (password !== ADMIN_PASSWORD) {
            // Xóa file vừa upload nếu sai mật khẩu
            if (req.file) {
                await fs.unlink(req.file.path);
            }
            return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
        }
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Không có file nào được upload!' });
        }
        
        res.json({ 
            success: true, 
            message: 'Upload thành công!',
            filename: req.file.filename,
            path: '/' + req.file.filename,
            url: `http://localhost:${PORT}/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi upload: ' + error.message 
        });
    }
});

// ===== API: LẤY DANH SÁCH FILE HTML =====
app.get('/api/files/list', async (req, res) => {
    try {
        const files = await fs.readdir(__dirname);
        const htmlFiles = files.filter(f => f.endsWith('.html'));
        
        res.json({ 
            success: true, 
            files: htmlFiles 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi đọc danh sách file: ' + error.message 
        });
    }
});

// ===== API: LẤY DANH SÁCH ẢNH =====
app.get('/api/images/list', async (req, res) => {
    try {
        const files = await fs.readdir(__dirname);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const imageFiles = files.filter(f => {
            const ext = path.extname(f).toLowerCase();
            return imageExtensions.includes(ext);
        });
        
        res.json({ 
            success: true, 
            images: imageFiles.map(img => ({
                name: img,
                url: `http://localhost:${PORT}/${img}`
            }))
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi đọc danh sách ảnh: ' + error.message 
        });
    }
});

// ===== KHỞI ĐỘNG SERVER =====
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   🚀 CMS SERVER ĐANG CHẠY!                    ║');
    console.log('║                                                ║');
    console.log(`║   📍 Trang Admin: http://localhost:${PORT}/admin.html  ║`);
    console.log(`║   🌐 Website: http://localhost:${PORT}/              ║`);
    console.log('║                                                ║');
    console.log('║   ⚠️  Mật khẩu mặc định: admin123             ║');
    console.log('║   ⚠️  ĐỔI MẬT KHẨU trong file server.js!      ║');
    console.log('╚════════════════════════════════════════════════╝');
});
