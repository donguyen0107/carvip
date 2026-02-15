# 🔧 Fix Admin Login trên Vercel

## ✅ Đã sửa gì?

### 1. Cập nhật `api/admin/login.js`
- ✅ Thêm CORS headers
- ✅ Xử lý OPTIONS request (preflight)
- ✅ Thêm `async` function handler

### 2. Tạo file test
- ✅ `tmp_rovodev_test_admin_api.html` - Test API endpoint

---

## 🚀 Các bước deploy

### Bước 1: Commit & Push code mới
```bash
git add .
git commit -m "Fix admin login API with CORS headers"
git push origin main
```

### Bước 2: Đợi Vercel deploy (2-3 phút)
Vercel sẽ tự động deploy sau khi bạn push.

---

## 🧪 Kiểm tra API

### Cách 1: Dùng file test
1. Sau khi deploy xong, truy cập:
   ```
   https://your-site.vercel.app/tmp_rovodev_test_admin_api.html
   ```

2. Click các nút test để kiểm tra:
   - **Test 1**: Kiểm tra API endpoint có tồn tại không
   - **Test 2**: Test login với credentials đúng
   - **Test 3**: Test login với credentials sai

### Cách 2: Dùng Browser DevTools
1. Mở trang admin-login.html
2. Mở DevTools (F12) → Tab Console
3. Nhập credentials và submit
4. Xem lỗi chi tiết trong Console và Network tab

### Cách 3: Test trực tiếp với curl
```bash
curl -X POST https://your-site.vercel.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","remember":false}'
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Đăng nhập thành công!",
  "token": "YWRtaW46MTcwODAwMDAwMDAwMA=="
}
```

---

## 🔍 Debug nếu vẫn lỗi

### Lỗi 1: "Lỗi kết nối. Vui lòng thử lại."
**Nguyên nhân:** API endpoint không tồn tại hoặc không deploy đúng

**Giải pháp:**
1. Kiểm tra folder structure:
   ```
   project/
   ├── api/
   │   └── admin/
   │       └── login.js  ← File này phải tồn tại
   ```

2. Kiểm tra Vercel Dashboard:
   - Vào https://vercel.com/dashboard
   - Click vào project của bạn
   - Tab "Functions" → Xem có `/api/admin/login` không

3. Check deployment logs:
   - Tab "Deployments" → Click vào deployment mới nhất
   - Xem có error nào không

### Lỗi 2: CORS Error
**Triệu chứng:** Console hiển thị lỗi CORS

**Giải pháp:**
- File `api/admin/login.js` đã có CORS headers
- Kiểm tra lại code đã được deploy chưa

### Lỗi 3: 404 Not Found
**Nguyên nhân:** API route không được nhận diện

**Giải pháp:**
1. Đảm bảo file đúng tên: `login.js` (không phải `login.ts` hay `index.js`)
2. Đảm bảo folder đúng: `api/admin/login.js`
3. Redeploy lại:
   ```bash
   vercel --prod
   ```

---

## 📝 Thông tin đăng nhập

**Default credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ ĐỔI MẬT KHẨU KHI LÊN PRODUCTION!**

### Cách đổi mật khẩu trên Vercel:

1. Vào Vercel Dashboard → Project Settings
2. Tab "Environment Variables"
3. Thêm 2 variables:
   - `ADMIN_USERNAME` = `your_username`
   - `ADMIN_PASSWORD` = `your_secure_password`
4. Redeploy project

---

## 📂 Files liên quan

- `api/admin/login.js` - API endpoint
- `admin-login.html` - Trang đăng nhập
- `vercel.json` - Cấu hình routing
- `tmp_rovodev_test_admin_api.html` - File test (xóa sau khi xong)

---

## 🎯 Checklist

- [ ] Push code lên GitHub
- [ ] Vercel deploy xong (check dashboard)
- [ ] Test API bằng file test
- [ ] Thử đăng nhập ở admin-login.html
- [ ] Đổi mật khẩu (production)
- [ ] Xóa file test: `tmp_rovodev_test_admin_api.html`

---

## 💡 Tips

1. **Luôn kiểm tra Console (F12)** khi gặp lỗi
2. **Xem Network tab** để xem request/response chi tiết
3. **Check Vercel logs** nếu API không hoạt động
4. **Dùng file test** để verify API trước khi test login

---

## 🆘 Vẫn không được?

Hãy gửi cho tôi:
1. Screenshot lỗi trong Console (F12)
2. Screenshot Network tab (request/response)
3. Link Vercel deployment của bạn

Tôi sẽ giúp debug chi tiết hơn!
