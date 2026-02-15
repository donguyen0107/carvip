# 📧 TẠO EMAIL TEMPLATE ĐƠN GIẢN

## 🚀 HƯỚNG DẪN TẠO TEMPLATE MỚI:

### **Bước 1: Vào EmailJS Templates**
```
https://dashboard.emailjs.com/admin/templates
```

### **Bước 2: Tạo Template Mới**
1. Click **"Create New Template"**
2. Chọn **"Order Confirmation"** hoặc **"Blank"**

### **Bước 3: Cấu hình Template**

#### **Template Name:**
```
Mercedes Booking Notification
```

#### **Subject:**
```
TEST - {{from_name}}
```

#### **Content (Text mode - KHÔNG dùng HTML):**
```
Test email từ hệ thống đặt xe Mercedes

Họ tên: {{from_name}}
Email: {{from_email}}
Điện thoại: {{phone}}
Xe: {{car_type}}
```

### **Bước 4: Settings**
Ở phần **Settings** bên phải:

1. **From name:** `Mercedes Booking`
2. **From email:** Để mặc định (EmailJS sẽ dùng service email)
3. **Reply to:** `{{from_email}}` (để reply về khách hàng)

### **Bước 5: Save và Copy ID**
1. Click **"Save"**
2. **Copy Template ID** hiển thị ở đầu trang (dạng: template_xxxxxxx)

---

## ⚙️ CẬP NHẬT CODE:

Mở file `emailjs-config.js` và sửa dòng 15:

```javascript
templateId: 'template_XXX_MỚI',  // ← Paste Template ID mới vào đây
```

---

## 🧪 TEST:

1. Save file `emailjs-config.js`
2. Refresh: `http://localhost:8000/TEST_EMAIL_BOOKING.html`
3. Test lại
4. Console phải show: `✅ Email sent successfully`

---

## 📋 TEMPLATE ĐẦY ĐỦ (SAU KHI TEST THÀNH CÔNG):

Khi template test đơn giản đã work, bạn có thể sửa lại thành template đầy đủ:

### **Subject:**
```
🚗 ĐƠN ĐẶT XE MỚI - {{car_type}} - {{from_name}}
```

### **Content:**
```
═══════════════════════════════════════════════════════
🚗 THÔNG BÁO ĐƠN ĐẶT XE MỚI
═══════════════════════════════════════════════════════

📋 THÔNG TIN KHÁCH HÀNG:
• Họ tên: {{from_name}}
• Email: {{from_email}}
• Điện thoại: {{phone}}
• CMND/CCCD: {{id_number}}

🚗 THÔNG TIN ĐẶT XE:
• Dòng xe: {{car_type}}
• Loại thuê: {{rental_type}}
• Thời gian thuê: {{duration}}
• Ngày nhận xe: {{pickup_date}}
• Ngày trả xe: {{return_date}}
• Địa điểm nhận: {{pickup_location}}
• Địa điểm trả: {{return_location}}
• Tài xế: {{driver}}

💼 DỊCH VỤ: {{services}}
📝 YÊU CẦU: {{special_requests}}

⏰ Thời gian đặt: {{booking_date}}
🔖 Mã booking: {{booking_id}}

═══════════════════════════════════════════════════════
Vui lòng liên hệ khách hàng trong vòng 24h
Email: {{from_email}}
Điện thoại: {{phone}}
═══════════════════════════════════════════════════════
```

---

## ✅ CHECKLIST:

- [ ] Đã vào EmailJS Templates
- [ ] Đã tạo template mới
- [ ] Đã paste Subject và Content
- [ ] Đã Save template
- [ ] Đã copy Template ID mới
- [ ] Đã update vào emailjs-config.js dòng 15
- [ ] Đã save file emailjs-config.js
- [ ] Đã test lại và thành công

---

🚀 **Tạo template mới và test ngay!**
