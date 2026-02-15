# 📦 Hướng Dẫn Tạo Vercel KV Database (Bắt Buộc!)

## ⚠️ Vấn đề hiện tại:
API thiếu environment variables:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

**Nguyên nhân:** Chưa tạo Vercel KV database!

---

## 🎯 Các bước tạo database (CHI TIẾT):

### **Bước 1: Vào Vercel Dashboard**

1. Mở trình duyệt, vào: https://vercel.com/dashboard
2. Đăng nhập vào tài khoản Vercel của bạn
3. Bạn sẽ thấy danh sách các projects

### **Bước 2: Chọn Project**

1. Tìm và **click vào project** của bạn (website xe sang)
2. Bạn sẽ vào trang chi tiết project

### **Bước 3: Vào Tab Storage**

1. Bên trái có menu: Overview, Deployments, Analytics, **Storage**, Settings
2. **Click vào "Storage"**
3. Bạn sẽ thấy trang Storage (có thể trống nếu chưa tạo database nào)

### **Bước 4: Create Database**

1. Click nút **"Create Database"** (nút màu đen/xanh)
2. Bạn sẽ thấy popup chọn loại database

### **Bước 5: Chọn KV**

1. Có nhiều tùy chọn: Postgres, KV, Blob, Edge Config
2. **Chọn "KV"** (có icon Redis)
3. Click **"Continue"**

### **Bước 6: Cấu hình Database**

1. **Database Name:** Nhập `blog-posts` (chính xác như vậy!)
2. **Region:** Chọn `Singapore (sin1)` hoặc gần VN nhất
3. **Pricing:** Free tier (0$/month) - đủ dùng
4. Click **"Create"**

### **Bước 7: Connect to Project**

1. Sau khi tạo xong, Vercel sẽ hỏi: "Connect to project?"
2. **Chọn project của bạn** từ dropdown
3. Click **"Connect"**
4. Vercel sẽ tự động thêm 4 environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### **Bước 8: Redeploy**

⚠️ **QUAN TRỌNG:** Environment variables chỉ áp dụng cho deployment MỚI!

**Cách 1: Tự động (khuyến nghị)**
```bash
# Push một commit bất kỳ để trigger redeploy
git commit --allow-empty -m "Trigger redeploy after KV setup"
git push origin main
```

**Cách 2: Manual redeploy**
1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click nút **"..."** (3 chấm) ở góc phải
4. Chọn **"Redeploy"**
5. Click **"Redeploy"** để confirm

### **Bước 9: Đợi Deploy (1-2 phút)**

Xem progress bar trong tab Deployments

### **Bước 10: Kiểm tra lại**

Sau khi deploy xong, test debug API:
```
https://your-site.vercel.app/api/blog/posts-debug
```

Kết quả mong đợi:
```json
{
  "environment": {
    "hasKV_REST_API_URL": true,    ✅
    "hasKV_REST_API_TOKEN": true,  ✅
    "kvConnection": "success"       ✅
  }
}
```

---

## 📸 Hình ảnh tham khảo (các bước):

```
Dashboard > Select Project > Storage Tab > Create Database
    ↓
Select "KV" > Continue
    ↓
Name: "blog-posts" > Region: Singapore > Create
    ↓
Connect to [Your Project] > Connect
    ↓
Redeploy project (Git push hoặc manual)
    ↓
Test: /api/blog/posts-debug ✅
```

---

## ❓ Troubleshooting:

### **Q: Không thấy nút "Create Database"?**
A: Kiểm tra:
- Bạn đã chọn đúng project chưa?
- Tab "Storage" có đúng không? (không phải Settings)
- Tài khoản Vercel có quyền tạo database không?

### **Q: Database đã tạo nhưng vẫn lỗi?**
A: Kiểm tra:
1. Đã **Connect to Project** chưa?
2. Vào Settings > Environment Variables - có 4 biến `KV_*` không?
3. Đã **Redeploy** sau khi tạo database chưa?

### **Q: Có mất phí không?**
A: **KHÔNG!** Free tier của Vercel KV:
- 30,000 commands/month - miễn phí
- 256 MB storage - miễn phí
- Đủ dùng cho blog cá nhân/doanh nghiệp nhỏ

### **Q: Tên database có phải là "blog-posts" không?**
A: **KHÔNG BẮT BUỘC!** Bạn có thể đặt tên gì cũng được (ví dụ: `my-blog`, `carvip-storage`). 
   Tên database chỉ để nhận biết, không ảnh hưởng đến code.
   Code sử dụng key `'blog-posts'` bên TRONG database, không phải tên database.

---

## ✅ Checklist sau khi tạo:

- [ ] Đã vào Vercel Dashboard
- [ ] Đã chọn đúng project
- [ ] Đã tạo KV database
- [ ] Đã Connect database to project
- [ ] Trong Settings > Environment Variables có 4 biến `KV_*`
- [ ] Đã Redeploy project
- [ ] Test debug API trả về `kvConnection: "success"`
- [ ] Upload blog thành công! 🎉

---

**Nếu làm đúng các bước trên, blog upload sẽ hoạt động 100%!**

**Cần giúp gì thêm, hãy cho tôi biết nhé!**
