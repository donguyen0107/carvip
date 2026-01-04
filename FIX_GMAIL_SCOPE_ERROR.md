# 🔐 SỬA LỖI: Gmail API - Insufficient Authentication Scopes

## ❌ LỖI:
```
412 Gmail_API: Request had insufficient authentication scopes.
```

## 🎯 NGUYÊN NHÂN:
Khi kết nối Gmail với EmailJS, bạn chưa cấp đủ quyền (permissions) cho EmailJS để gửi email.

---

## ✅ GIẢI PHÁP: KẾT NỐI LẠI GMAIL SERVICE

### **CÁCH 1: Reconnect Service (KHUYẾN NGHỊ - NHANH NHẤT)**

#### Bước 1: Xóa kết nối cũ
1. Vào: https://dashboard.emailjs.com/admin
2. Click **"Email Services"**
3. Tìm service Gmail (service_thxa957)
4. Click vào service → Tìm nút **"Disconnect"** hoặc **"Remove"**
5. Xác nhận xóa

#### Bước 2: Kết nối lại Gmail
1. Click **"Add New Service"**
2. Chọn **Gmail**
3. Click **"Connect Account"**
4. Đăng nhập Gmail: **donguyen072010@gmail.com**
5. **QUAN TRỌNG:** Khi Google hỏi quyền truy cập:
   - ✅ Tick vào **TẤT CẢ** các permissions
   - ✅ Đặc biệt là: "Send email on your behalf"
   - ✅ Click **"Allow"** hoặc **"Cho phép"**

#### Bước 3: Verify service mới
1. Check email verify từ EmailJS
2. Click link verify
3. Đợi service có dấu **tick xanh** ✅

#### Bước 4: Cập nhật Service ID mới
1. Copy **Service ID mới** (sẽ khác service_thxa957)
2. Mở file **emailjs-config.js**
3. Thay Service ID cũ bằng Service ID mới:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'Gfej9tcaaQEDJ0ASz',
    serviceId: 'service_XXX_MỚI',  // ← THAY ĐỔI
    templateId: 'template_p1atqb7',
    adminEmail: 'donguyen072010@gmail.com'
};
```

4. Save file

---

### **CÁCH 2: Grant Permissions từ Google Account**

#### Bước 1: Vào Google Account Security
```
https://myaccount.google.com/permissions
```

#### Bước 2: Tìm EmailJS
- Tìm app **"EmailJS"** trong danh sách
- Click vào để xem permissions

#### Bước 3: Revoke và reconnect
1. Click **"Remove access"** (Xóa quyền truy cập)
2. Quay lại EmailJS Dashboard
3. Service sẽ báo lỗi → Click **"Reconnect"**
4. Đăng nhập lại Gmail
5. **Cấp đầy đủ quyền** lần này

---

## 📋 CHECKLIST PERMISSIONS CẦN CẤP:

Khi Google hỏi quyền, đảm bảo có **TẤT CẢ** các quyền sau:

✅ **See, edit, create, and delete email messages**  
✅ **Send email on your behalf**  
✅ **View your email messages and settings**  
✅ **Manage drafts and send emails**

**KHÔNG bỏ qua bất kỳ quyền nào!**

---

## 🧪 TEST SAU KHI FIX:

1. Service có dấu **tick xanh** ✅
2. Update Service ID mới vào `emailjs-config.js`
3. Refresh: `http://localhost:8000/TEST_EMAIL_BOOKING.html`
4. Test gửi email
5. Console: `✅ Email sent successfully`
6. Gmail nhận được email test

---

## 🔍 TROUBLESHOOTING:

### ❌ Vẫn lỗi 412 sau khi reconnect?
**Nguyên nhân:** Chưa cấp đủ quyền

**Giải pháp:**
1. Vào: https://myaccount.google.com/permissions
2. Xóa hết quyền của EmailJS
3. Reconnect và **tick hết tất cả permissions**

### ❌ Google không cho cấp quyền?
**Nguyên nhân:** Gmail có bật 2FA hoặc Less Secure Apps

**Giải pháp:**
1. Tạm tắt 2FA (nếu có)
2. Hoặc dùng Gmail khác
3. Hoặc dùng service khác (Outlook, SendGrid)

### ❌ Service ID mới là gì?
**Cách xem:**
1. Vào Email Services
2. Click vào service Gmail mới
3. Service ID hiển thị ở đầu trang (dạng: service_abc1234)

---

## 💡 KHUYẾN NGHỊ:

### **Option A: Fix Gmail service (như trên)**
- Ưu điểm: Không cần đổi email
- Nhược điểm: Phải cấp nhiều quyền

### **Option B: Dùng service khác**
EmailJS hỗ trợ nhiều providers:
- **Outlook/Hotmail** (dễ setup hơn Gmail)
- **Yahoo Mail**
- **Custom SMTP**

Nếu Gmail khó fix, thử Outlook:
1. Tạo email Outlook mới (nếu chưa có)
2. Add New Service → Chọn **Outlook**
3. Kết nối dễ hơn Gmail

---

## 🎯 HÀNH ĐỘNG NGAY:

**Cách nhanh nhất:**

1. **Xóa** service Gmail cũ
2. **Tạo mới** service Gmail
3. **Cấp đủ quyền** khi Google hỏi
4. **Copy Service ID mới**
5. **Update** vào emailjs-config.js
6. **Test** lại

**Thời gian:** ~3-5 phút

---

🚀 **Làm ngay và cho tôi biết kết quả!**
