# 🚀 HƯỚNG DẪN SỬ DỤNG GITHUB ACTIONS

## ✅ BẠN ĐÃ CHỌN CÁCH AN TOÀN NHẤT!

Với GitHub Actions, bạn:
- ❌ **KHÔNG CẦN** token trong code
- ❌ **KHÔNG CẦN** viết bài trên web
- ✅ **Viết bài local** → Push lên GitHub → Tự động deploy
- ✅ **An toàn tuyệt đối** - Token không bao giờ lộ

---

## 📋 SETUP ĐÃ HOÀN TẤT

Tôi đã tạo sẵn workflow tại:
```
.github/workflows/update-blog.yml
```

Workflow này sẽ:
1. Tự động chạy khi có thay đổi file `posts.json`
2. Deploy tất cả file lên GitHub Pages
3. Dùng token tự động của GitHub (không cần token riêng)

---

## 🎯 CÁCH SỬ DỤNG

### Bước 1: Tạo/Sửa bài viết LOCAL

**Cách 1: Viết bài bằng tay**

Mở file `posts.json`, thêm bài mới:

```json
[
  {
    "id": "1767500000000",
    "title": "Tiêu đề bài viết",
    "slug": "tieu-de-bai-viet",
    "excerpt": "Mô tả ngắn về bài viết",
    "category": "tin-tuc",
    "image": "https://link-anh.jpg",
    "content": "<p>Nội dung bài viết</p>",
    "status": "published",
    "updatedAt": "2026-01-03T10:00:00.000Z"
  }
]
```

**Cách 2: Dùng trang admin LOCAL**

1. Mở file `blog-editor-offline.html` (không cần mở qua server)
2. Viết bài như bình thường
3. Click "Xuất bản" → Lưu vào LocalStorage
4. Mở Console (F12), chạy:
   ```javascript
   // Copy dữ liệu từ LocalStorage
   console.log(localStorage.getItem('blogPosts'));
   ```
5. Copy kết quả vào file `posts.json`

### Bước 2: Push lên GitHub

```bash
# Kiểm tra thay đổi
git status

# Add file posts.json
git add posts.json

# Commit
git commit -m "Add new blog post: Tiêu đề bài viết"

# Push
git push origin main
```

### Bước 3: Đợi GitHub Actions deploy

1. Vào repository: https://github.com/donguyen0107/carvip
2. Click tab **"Actions"**
3. Xem workflow "Update Blog Posts" đang chạy
4. Đợi **1-2 phút** cho workflow hoàn thành
5. ✅ Blog đã được cập nhật!

### Bước 4: Kiểm tra kết quả

Truy cập blog của bạn:
```
https://donguyen0107.github.io/carvip/blog.html
```

---

## 🔧 CẤU HÌNH GITHUB PAGES

Đảm bảo GitHub Pages đã được bật:

1. Vào: https://github.com/donguyen0107/carvip/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** 
   - Nếu dùng workflow: `gh-pages` / `/ (root)`
   - Nếu không dùng workflow: `main` / `/ (root)`
4. Click **"Save"**

---

## 📊 WORKFLOW HOẠT ĐỘNG NHƯ THẾ NÀO?

```
┌─────────────────┐
│  Bạn viết bài   │
│  trong posts.json│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ phát hiện push  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Chạy workflow   │
│ Deploy to Pages │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Blog cập nhật   │
│ tự động!        │
└─────────────────┘
```

---

## ✅ ƯU ĐIỂM

- ✅ **Không cần token trong code** - An toàn tuyệt đối
- ✅ **Tự động deploy** - Không cần làm gì thêm
- ✅ **Git history** - Có lịch sử thay đổi
- ✅ **Rollback dễ dàng** - Có thể quay lại phiên bản cũ
- ✅ **Collaboration** - Nhiều người cùng viết bài
- ✅ **Professional** - Workflow chuẩn của developer

---

## ⚠️ LƯU Ý

### KHÔNG CẦN làm:
- ❌ Tạo GitHub Personal Access Token riêng
- ❌ Lưu token trong Secrets (workflow dùng token tự động)
- ❌ Viết bài trên trang web admin
- ❌ Commit file có token

### CHỈ CẦN làm:
- ✅ Sửa file `posts.json` local
- ✅ Commit và push
- ✅ Đợi GitHub Actions deploy

---

## 🐛 TROUBLESHOOTING

### Workflow không chạy?

**Kiểm tra:**
1. Vào **Actions** tab trong repo
2. Xem có lỗi không?
3. Đảm bảo file `.github/workflows/update-blog.yml` đã được commit

**Khắc phục:**
```bash
# Đảm bảo workflow file đã được push
git add .github/workflows/update-blog.yml
git commit -m "Add GitHub Actions workflow"
git push origin main
```

### Workflow chạy nhưng không deploy?

**Kiểm tra GitHub Pages settings:**
1. Vào: Settings → Pages
2. Đảm bảo Source được set đúng
3. Nếu dùng workflow: Source = `gh-pages` branch

### Bài viết không hiển thị?

**Cache issue:**
1. Hard refresh: `Ctrl + Shift + R`
2. Hoặc mở Incognito mode
3. Hoặc đợi 2-5 phút cho CDN cập nhật

---

## 💡 MẸO HAY

### Viết bài nhanh hơn

Tạo script để tự động tạo bài mới:

**File: `new-post.js`**
```javascript
const fs = require('fs');

const newPost = {
    id: Date.now().toString(),
    title: process.argv[2] || 'Untitled',
    slug: (process.argv[2] || 'untitled').toLowerCase().replace(/ /g, '-'),
    excerpt: process.argv[3] || '',
    category: 'tin-tuc',
    image: '',
    content: '<p></p>',
    status: 'published',
    updatedAt: new Date().toISOString()
};

const posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
posts.unshift(newPost);
fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));

console.log('✅ Created new post:', newPost.title);
```

**Sử dụng:**
```bash
node new-post.js "Tiêu đề bài mới" "Mô tả ngắn"
# Mở posts.json → Chỉnh sửa nội dung
git add posts.json
git commit -m "Add: Tiêu đề bài mới"
git push
```

### Xem log deployment

```bash
# Xem workflow runs
gh run list

# Xem chi tiết một run
gh run view <run-id>

# Hoặc vào web:
# https://github.com/donguyen0107/carvip/actions
```

---

## 🎉 KẾT LUẬN

Với GitHub Actions:
- ✅ Token không bao giờ lộ
- ✅ Workflow tự động
- ✅ An toàn và chuyên nghiệp
- ✅ Dễ dàng quản lý và rollback

**Bạn đã chọn cách tốt nhất!** 🚀

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Kiểm tra Actions tab để xem log lỗi
2. Đọc file `TROUBLESHOOTING_GITHUB.md`
3. Hoặc hỏi lại tôi!

**Happy blogging! ✍️**
