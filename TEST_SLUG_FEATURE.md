# ✅ Test Tính Năng Slug cho Blog

## 🎯 Mục Đích
Kiểm tra xem URL bài viết có dùng slug thân thiện SEO thay vì ID dài không.

---

## 📋 Checklist Test

### 1️⃣ **Tạo Bài Viết Mới với Slug Tự Động**

**Các bước:**
1. Mở `blog-editor.html` (hoặc `admin-login.html` → login)
2. Click "Bài Viết Mới"
3. Nhập tiêu đề: `Dịch vụ thuê xe Mercedes cao cấp`
4. **Kiểm tra:** Field "Đường dẫn (URL)" tự động có: `dich-vu-thue-xe-mercedes-cao-cap`
5. Nhập nội dung bài viết
6. Click "Xuất Bản"

**Kết quả mong đợi:**
- ✅ Slug tự động được tạo từ tiêu đề
- ✅ Slug không có dấu tiếng Việt
- ✅ Slug chỉ có chữ thường, số, và dấu gạch ngang (-)

---

### 2️⃣ **Tạo Bài Viết với Slug Tùy Chỉnh**

**Các bước:**
1. Click "Bài Viết Mới"
2. Nhập tiêu đề: `Mercedes S-Class 2024 - Đẳng cấp thượng lưu`
3. **Tự chỉnh sửa slug** thành: `mercedes-s-class-2024`
4. Nhập nội dung
5. Click "Xuất Bản"

**Kết quả mong đợi:**
- ✅ Slug là `mercedes-s-class-2024` (không phải auto-generate)
- ✅ Khi sửa tiêu đề sau đó, slug **KHÔNG tự động đổi** (vì đã edit manual)

---

### 3️⃣ **Kiểm Tra Link trên Trang Blog**

**Các bước:**
1. Mở `blog.html`
2. Hover vào bài viết vừa tạo
3. Xem URL ở thanh status bar (góc dưới browser)

**Kết quả mong đợi:**
- ✅ URL có dạng: `blog-post.html?slug=dich-vu-thue-xe-mercedes-cao-cap`
- ❌ **KHÔNG** có dạng: `blog-post.html?id=1737389472839`

---

### 4️⃣ **Kiểm Tra Bài Viết Chi Tiết**

**Các bước:**
1. Từ `blog.html`, click vào bài viết
2. Kiểm tra URL trên thanh địa chỉ browser

**Kết quả mong đợi:**
- ✅ URL: `https://yourdomain.com/blog-post.html?slug=dich-vu-thue-xe-mercedes-cao-cap`
- ✅ Bài viết hiển thị đầy đủ nội dung
- ✅ Tiêu đề, hình ảnh, nội dung đều đúng

---

### 5️⃣ **Kiểm Tra Slug Unique (Trùng lặp)**

**Các bước:**
1. Tạo bài viết 1: Tiêu đề `Dịch vụ xe Mercedes`
   - Slug tự động: `dich-vu-xe-mercedes`
2. Tạo bài viết 2: Tiêu đề `Dịch vụ xe Mercedes`
   - Slug tự động phải là: `dich-vu-xe-mercedes-1`
3. Tạo bài viết 3: Tiêu đề `Dịch vụ xe Mercedes`
   - Slug tự động phải là: `dich-vu-xe-mercedes-2`

**Kết quả mong đợi:**
- ✅ API tự động thêm suffix `-1`, `-2`, `-3`... để tránh trùng slug
- ✅ Mỗi bài viết có slug unique
- ✅ Không bị lỗi khi tạo bài trùng tiêu đề

---

### 6️⃣ **Kiểm Tra Edit Bài Viết (Giữ Slug Cũ)**

**Các bước:**
1. Mở 1 bài viết đã publish
2. Click "Sửa"
3. Đổi tiêu đề: `Mercedes S-Class 2024` → `Mercedes S-Class 2025 Mới`
4. **KHÔNG** đổi slug
5. Click "Xuất Bản"

**Kết quả mong đợi:**
- ✅ Slug giữ nguyên (không tự động đổi theo tiêu đề mới)
- ✅ Link cũ vẫn hoạt động
- ✅ Bài viết cập nhật nội dung mới

---

### 7️⃣ **Test SEO-Friendly URL**

**Kiểm tra các trường hợp đặc biệt:**

| Tiêu đề | Slug mong đợi |
|---------|---------------|
| `Dịch vụ thuê xe MERCEDES S-Class!!!` | `dich-vu-thue-xe-mercedes-s-class` |
| `Top 10 xe sang trọng @ TP.HCM` | `top-10-xe-sang-trong-tphcm` |
| `Thuê xe   với    giá    tốt` | `thue-xe-voi-gia-tot` (không có khoảng trắng thừa) |
| `Đặt xe đi sân bay Tân Sơn Nhất` | `dat-xe-di-san-bay-tan-son-nhat` |

**Kết quả mong đợi:**
- ✅ Loại bỏ ký tự đặc biệt (`!`, `@`, `#`, `%`, ...)
- ✅ Chuyển đổi tiếng Việt có dấu sang không dấu
- ✅ Loại bỏ khoảng trắng thừa
- ✅ Chỉ giữ lại: `a-z`, `0-9`, `-`

---

## 🧪 Test trên Vercel

### Sau khi deploy:

1. **Test Production URL:**
   ```
   https://your-domain.vercel.app/blog-post.html?slug=dich-vu-xe-mercedes
   ```

2. **Share link trên Facebook/Zalo:**
   - Kiểm tra preview có hiển thị đúng không
   - URL có thân thiện không (có slug thay vì ID)

3. **Google Search Console:**
   - Submit URL mới
   - Kiểm tra indexing

---

## ✅ Tóm Tắt Các Thay Đổi

### Files đã fix:

1. ✅ **`api/blog/posts.js`**
   - Lưu field `slug` vào Redis
   - Auto-generate slug nếu không có
   - Ensure unique slug (thêm suffix nếu trùng)
   - Hỗ trợ cả create và update

2. ✅ **`blog-editor.html`**
   - Auto-generate slug khi gõ tiêu đề
   - Cho phép edit slug manual
   - Reset flag khi tạo bài mới
   - Track manual edit để không auto-overwrite

3. ✅ **`blog.html`**
   - Link dùng `?slug=...` thay vì `?id=...`
   - Recent posts cũng dùng slug

4. ✅ **`blog-post.html`**
   - Ưu tiên đọc `slug` từ URL
   - Fallback về `id` nếu không có slug
   - Tìm bài viết theo slug hoặc id

---

## 🚀 Deploy lên Vercel

```bash
git add .
git commit -m "Add SEO-friendly slug feature for blog posts"
git push origin main
```

Vercel sẽ tự động deploy!

---

## 📞 Cần Test Ngay

1. Tạo 1 bài viết mới với tiêu đề tiếng Việt
2. Kiểm tra URL có dạng `?slug=...`
3. Click vào bài viết xem có mở được không
4. Share link cho ai đó test

---

**Hoàn thành!** 🎉
