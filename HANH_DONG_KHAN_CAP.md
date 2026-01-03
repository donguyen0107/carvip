# 🚨 HÀNH ĐỘNG KHẨN CẤP - TOKEN BỊ LỘ

## ⚠️ TÌNH HUỐNG

GitHub đã phát hiện token của bạn trong code public. Token này **ĐÃ BỊ LỘ** và có thể bị lạm dụng!

---

## 🔥 LÀM NGAY (5 PHÚT)

### Bước 1: THU HỒI TOKEN CŨ (1 phút)

1. **Vào:** https://github.com/settings/tokens
2. **Tìm token:** `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`
3. **Click "Delete"** hoặc **"Revoke"**
4. **Xác nhận xóa**

✅ **Token cũ đã vô hiệu hóa** → Kẻ xấu không dùng được nữa

---

### Bước 2: TẠO TOKEN MỚI (2 phút)

1. **Vào:** https://github.com/settings/tokens
2. **Click:** "Generate new token (classic)"
3. **Điền:**
   - Note: `Blog Editor - Secure`
   - Expiration: `No expiration`
   - Scopes: ✅ **repo** (full control)
4. **Click:** "Generate token"
5. **Copy token** (dạng `ghp_xxxxx...`)

---

### Bước 3: CẬP NHẬT TOKEN MỚI (1 phút)

**Mở file:** `github-config.local.js`

**Thay token cũ bằng token mới:**
```javascript
const GITHUB_CONFIG = {
    owner: 'donguyen0107',
    repo: 'carvip',
    branch: 'main',
    token: 'ghp_TOKEN_MỚI_CỦA_BẠN'  // ← Dán token mới vào đây
};
```

**Lưu file** (Ctrl + S)

---

### Bước 4: COMMIT CODE AN TOÀN (1 phút)

```bash
# Kiểm tra file nào sẽ được commit
git status

# QUAN TRỌNG: Đảm bảo github-config.local.js KHÔNG xuất hiện
# Nếu có → DỪNG LẠI và kiểm tra .gitignore

# Commit những file an toàn
git add .gitignore github-config.js
git commit -m "Security: Remove token from public files"
git push origin main
```

---

## ✅ SAU KHI HOÀN TẤT

Bạn đã bảo vệ được tài khoản:

✅ Token cũ đã bị vô hiệu hóa
✅ Token mới chỉ có bạn biết
✅ Token mới không bị commit lên GitHub
✅ Kẻ xấu không thể truy cập repo của bạn

---

## 🔒 CÁC FILE QUAN TRỌNG

### ✅ File AN TOÀN (có thể commit):
- `.gitignore` ← Bảo vệ token
- `github-config.js` ← Token rỗng

### ❌ File NGUY HIỂM (KHÔNG commit):
- `github-config.local.js` ← Có token thật

---

## 🎯 CÁCH DÙNG TỪ BÂY GIỜ

### Trên máy tính của bạn (LOCAL):

1. Mở file admin HTML
2. Thêm vào trước `</head>`:
```html
<script src="github-config.local.js"></script>
```

3. Làm việc bình thường với token

### Khi deploy lên GitHub Pages:

1. **KHÔNG commit** file `github-config.local.js`
2. Chỉ commit file `github-config.js` (token rỗng)
3. Người khác xem blog → Không cần token

---

## 📋 CHECKLIST

Đảm bảo bạn đã làm:

- [ ] Thu hồi token cũ: `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`
- [ ] Tạo token mới với quyền **repo**
- [ ] Cập nhật token mới vào `github-config.local.js`
- [ ] Kiểm tra `.gitignore` có bảo vệ file local
- [ ] Commit code (KHÔNG bao gồm file local)
- [ ] Push lên GitHub
- [ ] Xác nhận token không còn trên GitHub

---

## ❓ KIỂM TRA KẾT QUẢ

### Cách 1: Kiểm tra trên GitHub

1. Vào: https://github.com/donguyen0107/carvip
2. Mở file: `github-config.js`
3. Xem dòng token:
   - ✅ Nếu: `token: ''` → An toàn
   - ❌ Nếu: `token: 'ghp_...'` → Nguy hiểm!

### Cách 2: Kiểm tra Git Status

```bash
git status

# File github-config.local.js KHÔNG nên xuất hiện
# Nếu có dòng:
#   github-config.local.js
# → .gitignore chưa hoạt động!
```

---

## 💡 TẠI SAO LẠI NGUY HIỂM?

Khi token bị lộ, kẻ xấu có thể:

1. **Xem tất cả repo** bạn có quyền truy cập
2. **Sửa/xóa code** trong repository
3. **Tạo commit giả mạo** dưới tên bạn
4. **Đọc dữ liệu private** (nếu token có quyền)
5. **Thay đổi settings** của repo
6. **Xóa toàn bộ repository** (nếu token có quyền admin)

→ **RỦI RO RẤT LỚN!**

---

## 🚀 GẤP! LÀM NGAY!

**Ưu tiên số 1:** Thu hồi token cũ
**Link:** https://github.com/settings/tokens

Bạn có **vài phút** trước khi có người tìm thấy và lạm dụng token!

---

## 📞 NẾU CẦN HỖ TRỢ

Nếu không biết cách làm, hãy:

1. **Thu hồi token ngay** (quan trọng nhất!)
2. **Đóng terminal/command prompt** (để không vô tình commit)
3. **Hỏi lại tôi** để được hướng dẫn chi tiết

**KHÔNG BỎ QUA BƯỚC THU HỒI TOKEN!**

---

🔒 **Hãy hành động ngay bây giờ!**
