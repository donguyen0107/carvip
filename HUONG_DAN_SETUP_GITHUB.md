# 🚀 HƯỚNG DẪN SETUP GITHUB API - ĐĂNG BÀI TRỰC TIẾP

## ✅ Đã hoàn thành cấu hình ban đầu

Tôi đã cấu hình xong thông tin repository của bạn:
- **Username:** donguyen0107
- **Repository:** carvip
- **Branch:** main

---

## 📋 BƯỚC 1: TẠO GITHUB PERSONAL ACCESS TOKEN

Token này cho phép website của bạn lưu bài viết lên GitHub mà không cần can thiệp vào code.

### 1.1. Truy cập GitHub Settings
1. Đăng nhập vào GitHub: https://github.com
2. Click vào **ảnh đại diện** (góc trên bên phải)
3. Chọn **Settings**

### 1.2. Tạo Token mới
1. Kéo xuống menu bên trái, chọn **Developer settings** (ở cuối cùng)
2. Chọn **Personal access tokens** → **Tokens (classic)**
3. Click nút **Generate new token** → chọn **Generate new token (classic)**

### 1.3. Cấu hình Token
Điền thông tin như sau:

**Note (Ghi chú):**
```
BOOKCARVIP Blog Editor - Token để đăng bài
```

**Expiration (Hết hạn):**
```
Chọn: No expiration (Không hết hạn)
hoặc: 90 days (nếu muốn bảo mật hơn)
```

**Select scopes (Chọn quyền):**
- ✅ **repo** (Tick vào ô này - nó sẽ tự động tick tất cả các ô con bên dưới)
  - ✅ repo:status
  - ✅ repo_deployment
  - ✅ public_repo
  - ✅ repo:invite
  - ✅ security_events

### 1.4. Tạo Token
1. Kéo xuống cuối trang
2. Click nút **Generate token** (màu xanh lá)
3. **QUAN TRỌNG:** Một token dạng `ghp_xxxxxxxxxxxxxxxxxxxx` sẽ hiện ra
4. **COPY TOKEN NÀY NGAY** (chỉ hiện 1 lần duy nhất!)

---

## 📋 BƯỚC 2: ĐIỀN TOKEN VÀO CODE

### 2.1. Mở file `github-config.js`
Tìm dòng:
```javascript
token: ''  // ⚠️ Dán token của bạn vào đây
```

### 2.2. Dán Token vào
Thay đổi thành:
```javascript
token: 'ghp_xxxxxxxxxxxxxxxxxxxx'  // ✅ Token của bạn
```

**Ví dụ:**
```javascript
const GITHUB_CONFIG = {
    owner: 'donguyen0107',  // ✅ Đã cấu hình
    repo: 'carvip',         // ✅ Đã cấu hình
    branch: 'main',
    token: 'ghp_abc123xyz789...'  // ⚠️ Thay bằng token thật của bạn
};
```

### 2.3. Lưu file
- Nhấn **Ctrl + S** (Windows) hoặc **Cmd + S** (Mac)

---

## 📋 BƯỚC 3: ĐĂNG BÀI LÊN GITHUB PAGES

### 3.1. Tải code lên GitHub

**Cách 1: Dùng GitHub Desktop (Dễ nhất)**
1. Tải GitHub Desktop: https://desktop.github.com
2. Mở GitHub Desktop
3. Chọn **File** → **Add Local Repository**
4. Chọn thư mục code của bạn
5. Nhấn **Commit to main** (góc dưới bên trái)
6. Nhấn **Push origin** (phía trên)

**Cách 2: Dùng Git Command Line**
```bash
git add .
git commit -m "Setup GitHub Storage for blog"
git push origin main
```

**Cách 3: Upload trực tiếp trên GitHub.com**
1. Vào repository: https://github.com/donguyen0107/carvip
2. Click **Add file** → **Upload files**
3. Kéo thả tất cả file vào
4. Click **Commit changes**

### 3.2. Bật GitHub Pages
1. Vào repository: https://github.com/donguyen0107/carvip
2. Click tab **Settings** (phía trên)
3. Kéo xuống menu bên trái, chọn **Pages**
4. Tại mục **Source**, chọn:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Đợi 2-3 phút để GitHub deploy

### 3.3. Kiểm tra website
URL của bạn sẽ là:
```
https://donguyen0107.github.io/carvip/
```

---

## 📋 BƯỚC 4: SỬ DỤNG - ĐĂNG BÀI TRỰC TIẾP

### 4.1. Truy cập trang Admin
```
https://donguyen0107.github.io/carvip/admin-instant.html
```

### 4.2. Đăng nhập
- **Username:** admin
- **Password:** admin123

### 4.3. Vào trang Viết bài
Click vào **"Viết & Quản lý bài viết"**

### 4.4. Viết bài mới
1. Nhập **Tiêu đề**
2. Nhập **Mô tả ngắn**
3. Chọn **Danh mục**
4. Nhập **URL ảnh đại diện** (nếu có)
5. Viết **Nội dung** trong editor
6. Click **"Xuất Bản"**

### 4.5. Kiểm tra kết quả
- **Tự động lưu lên GitHub:** File `posts.json` sẽ được tạo/cập nhật
- **Xem blog:** https://donguyen0107.github.io/carvip/blog.html
- **Kiểm tra trên GitHub:** https://github.com/donguyen0107/carvip/blob/main/posts.json

---

## 🎯 CÁCH HOẠT ĐỘNG

```
┌─────────────────┐
│  Bạn viết bài   │
│  trên website   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub API     │
│  lưu vào repo   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Pages   │
│  tự động deploy │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Người khác xem │
│  bài viết mới   │
└─────────────────┘
```

---

## ✅ ƯU ĐIỂM

✨ **Không cần chỉnh sửa code:** Viết bài trực tiếp trên web
✨ **Miễn phí 100%:** GitHub Pages + GitHub API hoàn toàn free
✨ **Tự động backup:** Mọi thay đổi được lưu trên GitHub
✨ **Chia sẻ dễ dàng:** Gửi link blog cho người khác xem
✨ **Không cần server:** Chạy hoàn toàn trên frontend
✨ **Có lịch sử:** Xem lại các phiên bản cũ qua Git history

---

## 🔒 BẢO MẬT

### Token có bị lộ không?
- ❌ **KHÔNG** commit file `github-config.js` có token lên GitHub public
- ✅ Token chỉ lưu trên máy bạn
- ✅ Khi deploy, đừng đẩy file có token lên

### Cách bảo vệ Token
1. **Tạo file `.gitignore`** (nếu chưa có):
```
github-config.js
```

2. **Hoặc tạo file riêng** `github-config.local.js`:
```javascript
// File này KHÔNG commit lên GitHub
const GITHUB_CONFIG = {
    owner: 'donguyen0107',
    repo: 'carvip',
    branch: 'main',
    token: 'ghp_xxxxxxxxxxxxxxxxxxxx'  // Token thật ở đây
};
window.GITHUB_CONFIG = GITHUB_CONFIG;
```

3. **Sau đó sửa HTML** để load file local:
```html
<script src="github-config.local.js"></script>
```

---

## ❓ TROUBLESHOOTING

### 1. Lỗi: "Failed to save to GitHub"
**Nguyên nhân:**
- Token sai hoặc hết hạn
- Token chưa có quyền `repo`

**Giải pháp:**
- Kiểm tra lại token trong `github-config.js`
- Tạo token mới với quyền `repo`

### 2. Không thấy bài viết sau khi đăng
**Nguyên nhân:**
- GitHub Pages chưa deploy xong

**Giải pháp:**
- Đợi 2-3 phút
- Xóa cache trình duyệt (Ctrl + F5)
- Kiểm tra file `posts.json` trên GitHub

### 3. Token hiện chữ "403 Forbidden"
**Nguyên nhân:**
- Token không có quyền truy cập repo

**Giải pháp:**
- Vào repo settings → Collaborators
- Hoặc tạo token mới với quyền `repo` đầy đủ

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, hãy kiểm tra:
1. ✅ Token đã điền đúng chưa?
2. ✅ File `github-config.js` đã lưu chưa?
3. ✅ Code đã push lên GitHub chưa?
4. ✅ GitHub Pages đã bật chưa?
5. ✅ Đợi đủ 2-3 phút chưa?

---

## 🎉 HOÀN THÀNH!

Bây giờ bạn có thể:
- ✅ Viết bài trực tiếp trên web
- ✅ Không cần chỉnh sửa code
- ✅ Tự động lưu lên GitHub
- ✅ Chia sẻ blog cho người khác

**URL Admin:** https://donguyen0107.github.io/carvip/admin-instant.html
**URL Blog:** https://donguyen0107.github.io/carvip/blog.html

---

**Chúc bạn thành công! 🚀**
