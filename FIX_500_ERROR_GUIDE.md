# 🔧 Hướng Dẫn Sửa Lỗi 500 - Blog Upload

## ❌ Lỗi hiện tại:
```
Failed to load resource: the server responded with a status of 500 ()
```

## ✅ Nguyên nhân:
Package `@vercel/kv` chưa được cài đặt trong `package.json`

## 🚀 Các bước sửa lỗi:

### **Bước 1: Push code mới (đã thêm @vercel/kv)**

```bash
git add .
git commit -m "Add @vercel/kv package and fix blog API"
git push origin main
```

### **Bước 2: Tạo Vercel KV Database**

⚠️ **QUAN TRỌNG:** Bạn PHẢI tạo database trước khi API hoạt động!

1. Vào **Vercel Dashboard**: https://vercel.com/dashboard
2. Chọn project của bạn
3. Click tab **Storage** (bên trái)
4. Click **Create Database**
5. Chọn **KV (Redis-compatible)**
6. **Đặt tên:** `blog-posts` (chính xác như vậy!)
7. Chọn region gần nhất (Singapore cho VN)
8. Click **Create**

### **Bước 3: Vercel tự động thêm Environment Variables**

Sau khi tạo KV, Vercel sẽ tự động thêm các biến môi trường:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### **Bước 4: Redeploy (nếu cần)**

Nếu sau khi tạo KV mà vẫn lỗi, hãy redeploy:
1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click nút **...** (3 chấm)
4. Chọn **Redeploy**

### **Bước 5: Test Debug API (Optional)**

Để kiểm tra API có kết nối KV không:
```
https://your-site.vercel.app/api/blog/posts-debug
```

Kết quả sẽ cho biết:
- ✅ `hasKV_REST_API_URL: true` → KV đã setup
- ✅ `kvConnection: "success"` → Kết nối thành công
- ❌ `kvConnection: "failed"` → Có lỗi, xem `kvError`

### **Bước 6: Test Upload Blog**

1. Truy cập: `https://your-site.vercel.app/admin-login.html`
2. Đăng nhập: `admin` / `admin123`
3. Tạo bài viết mới
4. Click **Xuất Bản**
5. Kiểm tra xem có lỗi không

---

## 🔍 Debug nếu vẫn lỗi:

### Check 1: Xem Log trên Vercel
1. Vào **Vercel Dashboard** → project
2. Tab **Deployments** → click deployment mới nhất
3. Tab **Functions** → click `/api/blog/posts`
4. Xem **Logs** để biết lỗi gì

### Check 2: Network Tab
1. Mở DevTools (F12)
2. Tab **Network**
3. Click request `/api/blog/posts` bị lỗi
4. Tab **Response** → xem message lỗi chi tiết

### Check 3: Environment Variables
1. Vercel Dashboard → Settings → Environment Variables
2. Kiểm tra có đầy đủ 4 biến `KV_*` không
3. Nếu thiếu → Vào Storage → Click vào database `blog-posts` → Tab **Settings** → **Connect**

---

## 📊 Files đã cập nhật:

- ✅ `package.json` - Thêm `@vercel/kv` dependency
- ✅ `api/blog/posts.js` - API GET/POST blog posts
- ✅ `api/blog/posts/[id].js` - API GET/PUT/DELETE theo ID
- ✅ `api/blog/posts-debug.js` - API debug để kiểm tra
- ✅ `vercel.json` - Routing config

---

## 🎯 Checklist:

- [ ] Đã push code lên GitHub (có `@vercel/kv` trong package.json)
- [ ] Đã tạo Vercel KV database tên `blog-posts`
- [ ] Vercel đã redeploy (hoặc tự động deploy)
- [ ] Environment variables có đầy đủ `KV_*`
- [ ] Test debug API trả về `kvConnection: "success"`
- [ ] Upload blog thành công!

---

**Sau khi làm đúng các bước, upload blog sẽ hoạt động! Nếu vẫn lỗi, gửi screenshot Vercel Logs cho tôi.**
