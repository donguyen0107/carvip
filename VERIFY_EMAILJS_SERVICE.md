# 🔐 HƯỚNG DẪN VERIFY EMAILJS SERVICE

## ❌ VẤN ĐỀ HIỆN TẠI:
```
Failed to load resource: the server responded with a status of 400
```

**Nguyên nhân:** Email Service chưa được verify!

---

## ✅ CÁCH VERIFY (3 PHÚT):

### **Bước 1: Mở EmailJS Dashboard**
```
https://dashboard.emailjs.com/admin
```

### **Bước 2: Vào Email Services**
- Click **"Email Services"** ở menu trái
- Tìm service Gmail bạn vừa tạo (service_thxa957)

### **Bước 3: Kiểm tra trạng thái**

**Nếu thấy:**
- ⚠️ Warning icon
- 🟡 "Verify" button  
- 📧 "Check your email"
- 🔴 Status: Not verified

→ **Service chưa verify!**

---

## 📧 VERIFY QUA EMAIL:

### **Cách 1: Tìm email verify đã gửi**
1. Mở Gmail: **donguyen072010@gmail.com**
2. Tìm email từ: **EmailJS** hoặc **noreply@emailjs.com**
3. Subject: "Verify your email service" hoặc tương tự
4. **Check cả SPAM folder** nếu không thấy trong inbox
5. Mở email và click link **"Verify"**
6. Xong!

### **Cách 2: Gửi lại email verify**
1. Trong Email Services, click vào service của bạn
2. Tìm button: **"Send verification email"** hoặc **"Resend verification"**
3. Click để gửi lại
4. Check Gmail (inbox + spam)
5. Click link verify trong email

---

## ✅ SAU KHI VERIFY:

Service sẽ có:
- ✅ **Green checkmark** (dấu tick xanh)
- 🟢 **Status: Active** hoặc **Verified**
- ✉️ **Ready to send**

---

## 🧪 TEST NGAY:

1. Đảm bảo service đã có **tick xanh**
2. Mở: `http://localhost:8000/TEST_EMAIL_BOOKING.html`
3. Click "Gửi Email Test"
4. Console sẽ show: `✅ Email sent successfully`
5. Check Gmail nhận được email!

---

## 🔍 TROUBLESHOOTING:

### ❌ Không tìm thấy email verify?
**Giải pháp:**
1. Check spam/junk folder
2. Tìm từ khóa: "emailjs" hoặc "verify"
3. Trong EmailJS Dashboard, click "Resend"

### ❌ Click link verify nhưng vẫn không active?
**Giải pháp:**
1. Logout EmailJS Dashboard
2. Login lại
3. Check service status lại
4. Nếu vẫn chưa → Xóa service và tạo lại

### ❌ Không có nút "Send verification email"?
**Giải pháp:**
1. Click vào service name để vào chi tiết
2. Hoặc click icon "..." (3 dots) → Options
3. Tìm verification settings

---

## 📝 CHECKLIST:

- [ ] Đã vào EmailJS Dashboard
- [ ] Đã vào Email Services  
- [ ] Đã tìm service Gmail (service_thxa957)
- [ ] Đã kiểm tra status (chưa verify)
- [ ] Đã tìm email verify trong Gmail (inbox + spam)
- [ ] Đã click link verify trong email
- [ ] Service có dấu tick xanh
- [ ] Đã test lại và thành công

---

## 🎉 SAU KHI VERIFY THÀNH CÔNG:

Bạn sẽ có thể gửi email tự động! Mỗi khi khách đặt xe, email sẽ đến ngay:
- 📧 **donguyen072010@gmail.com**
- 📋 Đầy đủ thông tin khách hàng và đơn đặt xe
- ⚡ Tự động 100%

---

**Hãy verify service và test lại ngay!** 🚀
