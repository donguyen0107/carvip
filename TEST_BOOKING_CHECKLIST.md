# ✅ CHECKLIST TEST BOOKING

## 🎯 TRƯỚC KHI TEST:

- [ ] Đã chạy HTTP server (python -m http.server 8000)
- [ ] Mở: http://localhost:8000/booking.html
- [ ] Console (F12) đã mở sẵn

---

## 📝 ĐIỀN FORM:

### **Step 1: Thông tin thuê xe**
- [ ] Chọn loại xe (S-Class, E-Class, etc.)
- [ ] Chọn loại thuê (Theo giờ/ngày/tháng)
- [ ] Nhập thời gian thuê (số lượng)
- [ ] Chọn ngày nhận xe
- [ ] Chọn ngày trả xe

### **Step 2: Thông tin khách hàng**
- [ ] Họ tên đầy đủ
- [ ] Số điện thoại
- [ ] Email
- [ ] CMND/CCCD
- [ ] Địa điểm nhận xe
- [ ] Chọn: Có tài xế / Tự lái

### **Step 3: Dịch vụ bổ sung**
- [ ] Chọn dịch vụ (nếu muốn)
- [ ] **✅ TICK VÀO CHECKBOX "Tôi đồng ý với điều khoản dịch vụ"** ← QUAN TRỌNG!

---

## 🚀 SUBMIT:

1. Click "Đặt xe ngay"
2. Xem Console logs

---

## ✅ KẾT QUẢ MONG ĐỢI:

### **Console logs:**
```
✅ Booking system loaded successfully
📧 Đang gửi email...
📧 Sending email with params: {...}
📧 Using Service ID: service_c1fcyxa
📧 Using Template ID: template_xxxxx
📧 Using Public Key: Gfej9tcaaQEDJ0ASz
✅ Email sent successfully: {status: 200, text: "OK"}
📧 Kết quả gửi email: {success: true, message: "..."}
```

### **Trên trang:**
- Modal "Đặt xe thành công" hiển thị
- Form được reset về step 1

### **Email:**
- Check Gmail: donguyen072010@gmail.com
- Nhận được email trong vài giây
- Email có gradient tím, layout đẹp

---

## ❌ NẾU CÓ LỖI:

### **Lỗi: "Bạn phải đồng ý với điều khoản dịch vụ"**
→ Tick vào checkbox terms

### **Lỗi: "An invalid form control..."**
→ Có field bắt buộc chưa điền

### **Lỗi: 400 Bad Request**
→ Template ID sai hoặc không tồn tại
→ Check: https://dashboard.emailjs.com/admin/templates

### **Lỗi: 412 Precondition Failed**
→ Template có variables không khớp
→ Dùng template đơn giản test trước

### **Lỗi: CORS**
→ Đang mở file:// trực tiếp
→ Phải chạy qua HTTP server

### **Không nhận email:**
1. Check Console có "Email sent successfully" không?
2. Check spam folder
3. Verify Template ID đã đúng chưa
4. Service có tick xanh verified chưa?

---

## 🔍 DEBUG:

Nếu vẫn lỗi, chạy:
```
http://localhost:8000/DEBUG_BOOKING.html
```

Xem các check:
- ✅ script.js loaded?
- ✅ emailjs-config.js loaded?
- ✅ EmailJS SDK loaded?
- ✅ sendBookingEmail function exists?
- ✅ Running via HTTP?

---

## 📧 THÔNG TIN CẦN CẬP NHẬT:

Nếu chưa update:

**File: emailjs-config.js (dòng 18)**
```javascript
templateId: 'template_xxxxx',  // ← Thay bằng Template ID thật
```

**Cách lấy Template ID:**
1. https://dashboard.emailjs.com/admin/templates
2. Click vào template
3. Copy Template ID ở đầu trang

---

## ✅ TEST THÀNH CÔNG KHI:

- [ ] Form submit không bị block
- [ ] Console: "Email sent successfully"
- [ ] Modal thành công hiển thị
- [ ] Email nhận được trong inbox/spam
- [ ] Email có layout đẹp (gradient tím)
- [ ] Thông tin trong email đầy đủ và đúng

---

**Làm theo checklist này và báo kết quả!** 🚀
