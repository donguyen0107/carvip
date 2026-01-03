# 🔒 HƯỚNG DẪN CÀI ĐẶT TOKEN AN TOÀN

## ⚠️ VẤN ĐỀ BẢO MẬT

GitHub đã phát hiện token trong code của bạn. Đây là **RỦI RO BẢO MẬT NGHIÊM TRỌNG**!

### 🚨 Tại sao nguy hiểm?

Khi token bị lộ trên GitHub public:
- ❌ Bất kỳ ai cũng có thể thấy token
- ❌ Họ có thể sửa/xóa repository của bạn
- ❌ Họ có thể đăng bài giả mạo
- ❌ Họ có thể truy cập tất cả repo mà token có quyền

---

## ✅ GIẢI PHÁP ĐÃ THỰC HIỆN

Tôi đã tạo hệ thống **token local an toàn** cho bạn:

### 1️⃣ File `github-config.js` (Public)
```javascript
// File này SẼ ĐƯỢC commit lên GitHub
token: ''  // Để trống - an toàn
```

### 2️⃣ File `github-config.local.js` (Private)
```javascript
// File này KHÔNG ĐƯỢC commit lên GitHub
token: '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'  // Token thật
```

### 3️⃣ File `.gitignore`
```
github-config.local.js  ← KHÔNG commit file này
github-config.js        ← KHÔNG commit file này
```

---

## 📋 CÁCH SỬ DỤNG

### 🏠 Khi làm việc LOCAL (trên máy bạn):

1. **Mở file HTML bất kỳ** (admin-instant.html, blog-editor.html...)
2. **Tìm dòng:**
   ```html
   <script src="github-config.js"></script>
   ```

3. **Thay bằng:**
   ```html
   <script src="github-config.local.js"></script>
   ```

4. **Lưu file**
5. **Mở trang admin** → Token sẽ hoạt động!

### 🌐 Khi DEPLOY lên GitHub Pages:

1. **Đừng thay đổi gì** trong file HTML
2. **Giữ nguyên:**
   ```html
   <script src="github-config.js"></script>
   ```

3. **Token sẽ rỗng** → Chỉ xem được, không chỉnh sửa được
4. **Người khác xem blog** → Không cần token

---

## 🚀 CÀI ĐẶT NHANH

### Bước 1: Cập nhật file HTML

**File cần sửa:**
- `admin-instant.html`
- `admin-login.html`
- `admin-simple.html`
- `admin.html`
- `blog-editor.html`
- `blog-editor-offline.html`

**Tìm dòng:**
```html
<script src="github-config.js"></script>
```

**Thay bằng (hoặc thêm vào trước nó):**
```html
<!-- Thử load token local trước (có token thật) -->
<script>
    // Thử load file local
    var script = document.createElement('script');
    script.src = 'github-config.local.js';
    script.onerror = function() {
        // Nếu không có file local, load file public (token rỗng)
        var fallback = document.createElement('script');
        fallback.src = 'github-config.js';
        document.head.appendChild(fallback);
    };
    document.head.appendChild(script);
</script>
```

### Bước 2: Commit code

```bash
git add .gitignore github-config.js
git commit -m "Remove token for security"
git push origin main
```

**LƯU Ý:** Chỉ commit `.gitignore` và `github-config.js` (không có token)

---

## 🔐 BẢO MẬT TOKEN

### ✅ ĐÚNG:

```
📁 Máy tính của bạn:
   ├── github-config.js (token rỗng)
   └── github-config.local.js (token thật) ← Chỉ trên máy bạn

📁 GitHub Repository:
   └── github-config.js (token rỗng) ← An toàn
```

### ❌ SAI:

```
📁 GitHub Repository:
   └── github-config.js (có token) ← NGUY HIỂM!
```

---

## ⚠️ QUAN TRỌNG: THU HỒI TOKEN CŨ

Token của bạn **ĐÃ BỊ LỘ** trên GitHub. Bạn PHẢI thu hồi nó ngay!

### Cách thu hồi token:

1. Vào: https://github.com/settings/tokens
2. Tìm token bị lộ
3. Click **"Delete"** hoặc **"Revoke"**
4. Xác nhận xóa

### Tạo token mới:

1. Vào: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Note: `Blog Editor - Secure`
4. Expiration: `No expiration`
5. Tick: ✅ **repo**
6. Copy token mới
7. Dán vào file **`github-config.local.js`** (KHÔNG phải github-config.js)

---

## 🎯 LUỒNG HOẠT ĐỘNG

### Khi làm việc LOCAL:
```
Browser → github-config.local.js (có token) → GitHub API ✅
```

### Khi người khác xem blog:
```
Browser → github-config.js (không có token) → Chỉ xem ✅
```

### Khi commit code:
```
git add . → .gitignore chặn github-config.local.js → An toàn ✅
```

---

## 💡 MẸO

### Kiểm tra file có bị commit không:

```bash
# Xem file nào sẽ được commit
git status

# File github-config.local.js KHÔNG nên xuất hiện
# Nếu có → .gitignore chưa hoạt động
```

### Xóa token khỏi Git history (nếu đã commit trước đó):

```bash
# Xóa tất cả lịch sử của file này
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch github-config.js" \
  --prune-empty --tag-name-filter cat -- --all

# Push force
git push origin --force --all
```

**Sau đó vẫn phải thu hồi token cũ!**

---

## ❓ FAQ

### Q: Tôi có thể dùng Environment Variables không?
A: Không dùng được trên GitHub Pages (static hosting). Chỉ dùng được khi có server.

### Q: Làm sao để admin vẫn chỉnh sửa được trên GitHub Pages?
A: Có 2 cách:
1. **Dùng file local** (như hướng dẫn trên) - Chỉ trên máy bạn
2. **Dùng GitHub Actions** - Tự động hóa việc đăng bài

### Q: Token bị lộ, ai đó có thể làm gì?
A: Họ có thể:
- Xem tất cả repo bạn có quyền
- Sửa/xóa code trong repo
- Tạo commit giả mạo
- Đọc code private (nếu token có quyền)

→ **THU HỒI NGAY!**

### Q: Tôi có nên public token lên?
A: **TUYỆT ĐỐI KHÔNG!** Token giống như mật khẩu. Không bao giờ public.

---

## 🎉 KẾT LUẬN

Bây giờ hệ thống của bạn đã an toàn:

✅ Token được lưu trong file local (không commit)
✅ File public không chứa token
✅ .gitignore bảo vệ file có token
✅ Người khác xem blog không cần token

**NHƯNG:** Bạn vẫn phải **THU HỒI TOKEN CŨ** vì nó đã bị lộ!

---

**Hãy thu hồi token ngay tại:** https://github.com/settings/tokens

Sau đó tạo token mới và điền vào `github-config.local.js`

Chúc bạn an toàn! 🔒
