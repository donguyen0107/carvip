# ⚡ QUICK START - ĐĂNG BÀI NGAY LẬP TỨC

## 🎯 Mục tiêu
Giúp bạn đăng bài lên blog **KHÔNG CẦN CHỈNH SỬA CODE** trong 5 phút!

---

## ✅ ĐÃ SETUP SẴN

- ✅ **Repository:** donguyen0107/carvip
- ✅ **GitHub Storage:** Đã tích hợp sẵn
- ✅ **Trang Admin:** Đã có sẵn giao diện

---

## 🚀 CHỈ CẦN 3 BƯỚC

### BƯỚC 1: Tạo GitHub Token (3 phút)

1. Vào: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Điền:
   - **Note:** `Blog Editor`
   - **Expiration:** `No expiration`
   - **Quyền:** Tick vào ✅ **repo**
4. Click **"Generate token"**
5. **COPY TOKEN** (dạng `ghp_xxxxx...`)

### BƯỚC 2: Điền Token (30 giây)

1. Mở file **`github-config.js`**
2. Tìm dòng: `token: ''`
3. Dán token vào: `token: 'ghp_xxxxx...'`
4. Lưu file (**Ctrl + S**)

### BƯỚC 3: Đẩy lên GitHub Pages (1 phút)

**Dùng GitHub Desktop:**
```
1. Commit changes
2. Push origin
3. Đợi 2 phút
```

**Hoặc dùng Git:**
```bash
git add .
git commit -m "Setup blog"
git push origin main
```

**Hoặc upload web:**
```
1. Vào https://github.com/donguyen0107/carvip
2. Kéo thả file vào
3. Commit
```

---

## 🎉 XONG! BẮT ĐẦU VIẾT BÀI

### Truy cập Admin:
```
https://donguyen0107.github.io/carvip/admin-instant.html
```

### Đăng nhập:
- **User:** admin
- **Pass:** admin123

### Viết bài:
1. Click **"Viết & Quản lý bài viết"**
2. Điền tiêu đề, nội dung
3. Click **"Xuất Bản"**
4. ✅ **TỰ ĐỘNG LƯU LÊN GITHUB!**

### Xem blog:
```
https://donguyen0107.github.io/carvip/blog.html
```

---

## 💡 GHI NHỚ

- 📝 Viết bài tại: `admin-instant.html`
- 👁️ Xem blog tại: `blog.html`
- 💾 Dữ liệu lưu tại: `posts.json` (tự động)
- 🔄 Không cần chỉnh code để đăng bài!

---

## 📖 Hướng dẫn chi tiết

Xem file **`HUONG_DAN_SETUP_GITHUB.md`** để biết thêm chi tiết.

---

**Good luck! 🚀**
