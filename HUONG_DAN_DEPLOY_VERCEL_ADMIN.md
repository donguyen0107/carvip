# 🚀 Hướng Dẫn Deploy Admin Login Lên Vercel

## ✅ Đã Hoàn Thành

1. ✅ Tạo file `api/admin/login.js` - Serverless function cho admin login
2. ✅ Cập nhật `vercel.json` - Thêm routing và CORS headers

## 📝 Cách Deploy

### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Add admin login API for Vercel"
git push origin main
```

### Bước 2: Deploy lên Vercel

#### Cách 1: Qua Vercel Dashboard (Khuyến nghị)
1. Truy cập: https://vercel.com
2. Đăng nhập với GitHub
3. Click "Add New Project"
4. Chọn repository của bạn
5. Click "Deploy"

#### Cách 2: Qua Vercel CLI
```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm install -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Bước 3: Cấu hình Environment Variables (Tùy chọn - Bảo mật cao hơn)

1. Vào Vercel Dashboard > Project Settings > Environment Variables
2. Thêm 2 biến:
   - `ADMIN_USERNAME` = `admin` (hoặc username tùy chỉnh)
   - `ADMIN_PASSWORD` = `your_secure_password` (mật khẩu mạnh hơn)
3. Click "Save"
4. Redeploy project để áp dụng

**Lưu ý:** Nếu không set environment variables, mặc định sẽ dùng:
- Username: `admin`
- Password: `admin123`

## 🔐 Thông Tin Đăng Nhập

### Mặc định:
- **URL:** `https://your-site.vercel.app/admin-login.html`
- **Username:** `admin`
- **Password:** `admin123`

### Sau khi set Environment Variables:
- **URL:** `https://your-site.vercel.app/admin-login.html`
- **Username:** Giá trị của `ADMIN_USERNAME`
- **Password:** Giá trị của `ADMIN_PASSWORD`

## 📂 Cấu Trúc File API

```
api/
├── admin/
│   └── login.js          ← API cho admin login
└── posts.js              ← API cho blog posts
```

### API Endpoints sau khi deploy:

- **Admin Login:** `POST https://your-site.vercel.app/api/admin/login`
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```

- **Blog Posts:** `GET/POST/PUT/DELETE https://your-site.vercel.app/api/posts`

## 🧪 Test Sau Khi Deploy

1. Mở: `https://your-site.vercel.app/admin-login.html`
2. Nhập username: `admin`
3. Nhập password: `admin123`
4. Click "Đăng Nhập"
5. Nếu thành công → chuyển đến `blog-editor.html`

## ⚠️ Lưu Ý Bảo Mật

### ⛔ KHÔNG NÊN (Development only):
- Để mật khẩu `admin123` trên production
- Commit environment variables vào Git
- Share mật khẩu admin công khai

### ✅ NÊN LÀM (Production):
1. **Đổi mật khẩu mạnh** qua Environment Variables
2. **Sử dụng HTTPS** (Vercel tự động)
3. **Giới hạn IP** nếu cần (Vercel Pro)
4. **Thêm rate limiting** để chống brute force
5. **Sử dụng JWT token** thay vì simple token (nâng cao)

## 🔧 Troubleshooting

### Lỗi: "Lỗi kết nối. Vui lòng thử lại."
- ✅ Kiểm tra API endpoint có tồn tại: `/api/admin/login.js`
- ✅ Kiểm tra `vercel.json` có routing đúng
- ✅ Check Vercel deployment logs

### Lỗi: "Sai tên đăng nhập hoặc mật khẩu!"
- ✅ Đảm bảo username = `admin`
- ✅ Đảm bảo password = `admin123` (hoặc giá trị environment variable)
- ✅ Không có khoảng trắng thừa

### Lỗi 404 - API không tìm thấy
- ✅ Kiểm tra file `api/admin/login.js` đã được deploy
- ✅ Xóa `.vercel` folder local và deploy lại
- ✅ Check Vercel build logs

## 📚 Tài Liệu Tham Khảo

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)

## 🎯 Kết Luận

Sau khi deploy thành công:
1. ✅ Admin login sẽ hoạt động trên Vercel
2. ✅ Không cần chạy `node server.js` local
3. ✅ API serverless tự động scale
4. ✅ HTTPS miễn phí
5. ✅ CDN toàn cầu

**Chúc bạn deploy thành công! 🎉**
