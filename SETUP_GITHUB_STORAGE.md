# 🚀 Hướng dẫn Setup GitHub Storage

## 📋 Tổng quan

Hệ thống này cho phép bạn:
- ✅ Viết bài qua web (không cần mở file HTML)
- ✅ Lưu bài viết trên GitHub (miễn phí)
- ✅ Người khác vào web thấy được bài viết
- ✅ Tự động đồng bộ giữa các máy

---

## 🎯 Cách hoạt động

```
Bạn viết bài trên web
        ↓
Lưu vào file posts.json trên GitHub
        ↓
Người dùng vào web → Đọc từ posts.json
        ↓
Tất cả đều thấy bài viết! 🎉
```

---

## 📝 BƯỚC 1: Tạo Repository trên GitHub

### 1.1. Đăng nhập GitHub
- Vào: https://github.com
- Đăng nhập (hoặc đăng ký nếu chưa có)

### 1.2. Tạo Repository mới
```
1. Click nút "New" (màu xanh lá)
2. Repository name: bookcarvip-blog
3. Chọn: ✅ Public
4. Chọn: ✅ Add a README file
5. Click "Create repository"
```

### 1.3. Upload code
```
1. Vào repository vừa tạo
2. Click "Add file" → "Upload files"
3. Kéo thả TẤT CẢ file vào (trừ node_modules)
4. Click "Commit changes"
```

---

## 🔑 BƯỚC 2: Tạo Personal Access Token

### 2.1. Vào trang tạo token
```
👉 https://github.com/settings/tokens
```

### 2.2. Tạo token mới
```
1. Click "Generate new token"
2. Chọn "Generate new token (classic)"
3. Điền:
   - Note: "BOOKCARVIP Blog Editor"
   - Expiration: No expiration
   - Quyền: ✅ Chọn "repo" (full control)
4. Click "Generate token"
5. COPY token ngay (chỉ hiện 1 lần!)
```

Token sẽ có dạng:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **QUAN TRỌNG:**
- Lưu token vào nơi an toàn
- KHÔNG chia sẻ token
- Token này cho phép sửa repository của bạn

---

## ⚙️ BƯỚC 3: Cấu hình GitHub

### 3.1. Mở file `github-config.js`

### 3.2. Điền thông tin

```javascript
const GITHUB_CONFIG = {
    owner: 'TenGitHubCuaBan',      // ⚠️ Thay bằng username GitHub
    repo: 'bookcarvip-blog',        // Tên repo vừa tạo
    branch: 'main',                 // Giữ nguyên
    token: 'ghp_xxxxx...'          // ⚠️ Dán token vào đây
};
```

**Ví dụ:**
```javascript
const GITHUB_CONFIG = {
    owner: 'nguyenvana',
    repo: 'bookcarvip-blog',
    branch: 'main',
    token: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
};
```

### 3.3. Lưu file

---

## 🌐 BƯỚC 4: Bật GitHub Pages

### 4.1. Vào Settings
```
1. Vào repository trên GitHub
2. Click "Settings" (bánh răng)
3. Bên trái chọn "Pages"
```

### 4.2. Cấu hình
```
1. Source: Deploy from a branch
2. Branch: Chọn "main" → "/ (root)"
3. Click "Save"
4. Đợi 2-5 phút
```

### 4.3. Lấy URL
```
URL sẽ là: https://TenGitHubCuaBan.github.io/bookcarvip-blog/

Ví dụ: https://nguyenvana.github.io/bookcarvip-blog/
```

---

## ✅ BƯỚC 5: Kiểm tra

### 5.1. Vào trang admin
```
https://TenGitHubCuaBan.github.io/bookcarvip-blog/admin-instant.html
```

### 5.2. Đăng nhập
```
Username: admin
Password: admin123
```

### 5.3. Vào viết bài
```
Click "Viết & Quản lý bài viết"
```

### 5.4. Viết bài test
```
1. Nhập tiêu đề: "Bài viết đầu tiên"
2. Nhập nội dung
3. Click "Xuất Bản"
```

### 5.5. Kiểm tra GitHub
```
1. Vào repository trên GitHub
2. Sẽ thấy file "posts.json" vừa được tạo
3. Click vào file để xem nội dung
```

### 5.6. Kiểm tra blog
```
1. Vào: https://TenGitHubCuaBan.github.io/bookcarvip-blog/blog.html
2. Sẽ thấy bài viết vừa đăng!
```

---

## 🎉 HOÀN THÀNH!

Giờ bạn có thể:
- ✅ Viết bài qua web: `https://TenGitHubCuaBan.github.io/bookcarvip-blog/admin-instant.html`
- ✅ Người khác xem blog: `https://TenGitHubCuaBan.github.io/bookcarvip-blog/blog.html`
- ✅ Chia sẻ link cho bạn bè!

---

## 🔄 Cách sử dụng hàng ngày

### Viết bài mới:
```
1. Vào: https://TenGitHubCuaBan.github.io/bookcarvip-blog/admin-instant.html
2. Đăng nhập
3. Click "Viết & Quản lý bài viết"
4. Viết nội dung
5. Click "Xuất Bản"
6. Đợi 1-2 phút để GitHub cập nhật
7. Bài viết xuất hiện trên blog!
```

### Sửa bài viết:
```
1. Vào trang editor
2. Tìm bài viết trong danh sách
3. Click "Sửa"
4. Chỉnh sửa
5. Click "Xuất Bản" lại
```

---

## ❓ FAQ

**Q: Tại sao cần GitHub Token?**
A: Để có thể GHI dữ liệu lên GitHub. Không có token thì chỉ ĐỌC được.

**Q: Token có an toàn không?**
A: Token được lưu trong file config, KHÔNG commit lên GitHub public. Chỉ bạn biết.

**Q: Người khác có cần token không?**
A: KHÔNG. Họ chỉ cần vào link blog để xem. Chỉ admin mới cần token.

**Q: Bài viết cập nhật có nhanh không?**
A: 1-2 phút sau khi xuất bản, bài viết sẽ hiện trên blog.

**Q: Có mất phí không?**
A: MIỄN PHÍ 100%! GitHub Pages và GitHub API đều free.

**Q: Có giới hạn không?**
A: 
- File tối đa 100MB (vừa cho blog)
- 100GB băng thông/tháng (đủ dùng)
- Không giới hạn số bài viết

**Q: Có thể đổi domain không?**
A: CÓ. Vào Settings → Pages → Custom domain.

**Q: Làm sao backup dữ liệu?**
A: Dữ liệu đã lưu trên GitHub, tự động backup!

---

## 🛠️ Troubleshooting

### Lỗi: "Failed to save to GitHub"
```
✅ Kiểm tra:
   - Token có đúng không?
   - Token có quyền "repo" chưa?
   - Username/repo có đúng không?
```

### Lỗi: "404 Not Found"
```
✅ Kiểm tra:
   - GitHub Pages đã bật chưa?
   - Đã đợi 2-5 phút chưa?
   - URL có đúng không?
```

### Bài viết không hiển thị
```
✅ Kiểm tra:
   - Đã "Xuất Bản" chưa? (không phải "Lưu Nháp")
   - Đã đợi 1-2 phút chưa?
   - F5 refresh lại trang
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Đọc lại hướng dẫn
2. Kiểm tra Console (F12) xem lỗi
3. Xem file posts.json trên GitHub
4. Liên hệ support

---

## 🎁 Bonus

### Custom Domain:
```
1. Mua domain (Tên miền)
2. Vào Settings → Pages → Custom domain
3. Nhập domain của bạn
4. Cấu hình DNS
```

### SSL/HTTPS:
```
GitHub Pages tự động bật HTTPS miễn phí!
```

### Analytics:
```
Thêm Google Analytics để xem số lượng người xem
```

---

🎉 **Chúc bạn thành công!**
