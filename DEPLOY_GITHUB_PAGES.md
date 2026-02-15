# 🚀 Hướng dẫn Deploy lên GitHub Pages

## 📋 Chuẩn bị

Bạn cần:
- ✅ Tài khoản GitHub (miễn phí)
- ✅ Git đã cài đặt
- ✅ Các file HTML của bạn

---

## 🎯 PHƯƠNG ÁN 1: LocalStorage (Đơn giản nhất)

### Bước 1: Tạo Repository trên GitHub

1. Vào https://github.com
2. Click nút **"New"** (màu xanh lá)
3. Đặt tên: `bookcarvip-blog`
4. Chọn **Public**
5. Click **"Create repository"**

### Bước 2: Upload code

**Cách A - Dùng GitHub Web (Dễ nhất):**

1. Vào repository vừa tạo
2. Click **"uploading an existing file"**
3. Kéo thả TẤT CẢ file (trừ `node_modules`, `blog-posts.json`)
4. Click **"Commit changes"**

**Cách B - Dùng Git (Advanced):**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/bookcarvip-blog.git
git push -u origin main
```

### Bước 3: Bật GitHub Pages

1. Vào repository
2. Click **Settings** (bánh răng)
3. Bên trái chọn **Pages**
4. Source: chọn **main** branch
5. Click **Save**
6. Đợi 2-5 phút

### Bước 4: Truy cập website

```
https://USERNAME.github.io/bookcarvip-blog/
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

### ❌ Những gì KHÔNG hoạt động trên GitHub Pages:

```
❌ server.js - KHÔNG chạy được
❌ /api/* endpoints - KHÔNG có
❌ Node.js backend - KHÔNG hỗ trợ
❌ Database - KHÔNG có
```

### ✅ Những gì VẪN hoạt động:

```
✅ blog.html - Hiển thị blog
✅ admin-instant.html - Đăng nhập
✅ blog-editor-offline.html - Viết bài
✅ LocalStorage - Lưu dữ liệu trên máy
✅ Tất cả HTML/CSS/JS tĩnh
```

---

## 🔄 Cách sử dụng sau khi deploy

### Viết bài mới:

```
1. Vào: https://USERNAME.github.io/bookcarvip-blog/admin-instant.html
2. Đăng nhập
3. Viết bài
4. Xuất bản
```

### ⚠️ Vấn đề:

```
❌ Chỉ BẠN thấy bài viết (trên máy bạn)
❌ Người khác vào web KHÔNG thấy bài viết
❌ Dữ liệu không đồng bộ giữa các máy
```

### ✅ Giải pháp:

Xem **PHƯƠNG ÁN 2** bên dưới!

---

## 🌟 PHƯƠNG ÁN 2: Lưu bài viết trên GitHub (Khuyến nghị)

### Ý tưởng:

```
Thay vì lưu trong LocalStorage (chỉ có trên máy bạn)
→ Lưu vào file JSON trên GitHub
→ Người khác vào web sẽ thấy bài viết!
```

### Cách hoạt động:

```
1. Viết bài trên admin-instant.html
2. Lưu vào file posts.json trên GitHub
3. Người dùng vào blog.html → Đọc từ posts.json
4. Tất cả đều thấy bài viết!
```

### Cần làm gì:

Tôi sẽ tạo thêm file JavaScript để:
- Đọc/ghi file trên GitHub qua API
- Dùng GitHub như "database"
- Miễn phí, không cần server

**Bạn có muốn tôi tạo code cho phương án này không?**

---

## 🔥 PHƯƠNG ÁN 3: Dùng Server thật (Advanced)

### Nền tảng hosting Node.js (Có phí):

**1. Vercel (Khuyến nghị)** ⭐
```
💰 Giá: MIỄN PHÍ (với giới hạn)
✅ Dễ setup
✅ Tự động deploy từ GitHub
👉 https://vercel.com
```

**2. Railway**
```
💰 Giá: $5/tháng
✅ Hỗ trợ database
✅ Dễ sử dụng
👉 https://railway.app
```

**3. Heroku**
```
💰 Giá: $7/tháng
✅ Phổ biến
👉 https://heroku.com
```

**4. DigitalOcean**
```
💰 Giá: $6/tháng
✅ Mạnh mẽ
✅ Cần biết Linux
👉 https://digitalocean.com
```

---

## 📊 So sánh các phương án

| Tính năng | PA1: LocalStorage | PA2: GitHub API | PA3: Server |
|-----------|-------------------|-----------------|-------------|
| **Giá** | MIỄN PHÍ | MIỄN PHÍ | $5-10/tháng |
| **Độ khó** | ⭐ Dễ | ⭐⭐ TB | ⭐⭐⭐ Khó |
| **Chia sẻ dữ liệu** | ❌ | ✅ | ✅ |
| **Sửa trên web** | ✅ | ✅ | ✅ |
| **Tốc độ** | ⚡ Nhanh | 🚀 Nhanh | 🚀 Nhanh |
| **Nhiều admin** | ❌ | ⚠️ Có thể | ✅ |

---

## 🎯 Khuyến nghị

### Nếu bạn là người mới:
```
👉 Dùng PHƯƠNG ÁN 2: GitHub API
   - Miễn phí
   - Dễ setup
   - Người khác thấy được bài viết
```

### Nếu bạn muốn chuyên nghiệp:
```
👉 Dùng PHƯƠNG ÁN 3: Vercel + MongoDB
   - Miễn phí (với giới hạn)
   - Tự động deploy
   - Database thật
```

---

## ❓ FAQ

**Q: GitHub Pages có chạy được server.js không?**
A: ❌ KHÔNG. GitHub Pages chỉ chạy HTML/CSS/JS tĩnh.

**Q: Làm sao để người khác thấy bài viết tôi viết?**
A: Dùng PHƯƠNG ÁN 2 (GitHub API) hoặc PHƯƠNG ÁN 3 (Server).

**Q: Tôi có thể dùng LocalStorage trên GitHub Pages không?**
A: ✅ CÓ, nhưng mỗi máy sẽ có dữ liệu riêng.

**Q: Phương án nào tốt nhất?**
A: 
- Người mới: PHƯƠNG ÁN 2 (GitHub API)
- Advanced: PHƯƠNG ÁN 3 (Vercel)

---

## 🚀 Bước tiếp theo

Bạn muốn tôi làm gì?

1. ✅ Tạo code cho PHƯƠNG ÁN 2 (GitHub API)
2. ✅ Hướng dẫn deploy lên Vercel (PHƯƠNG ÁN 3)
3. ✅ Giữ nguyên như hiện tại (LocalStorage)

Hãy cho tôi biết bạn chọn phương án nào! 😊
