# 🔧 SỬA LỖI 412 - EMAIL KHÔNG GỬI ĐƯỢC

## ❌ LỖI HIỆN TẠI:
```
Failed to load resource: the server responded with a status of 412
```

## 🎯 NGUYÊN NHÂN:
Lỗi **412 Precondition Failed** xảy ra khi:
1. **Template EmailJS thiếu variable** mà code đang gửi
2. **Template EmailJS có variable** mà code KHÔNG gửi
3. **Tên variable không khớp** giữa code và template

---

## ✅ GIẢI PHÁP (2 CÁCH)

### **CÁCH 1: Sửa Template EmailJS (KHUYẾN NGHỊ)**

#### Bước 1: Vào EmailJS Dashboard
- Truy cập: https://dashboard.emailjs.com/admin
- Vào **Email Templates**
- Click vào template bạn vừa tạo (template_p1atqb7)

#### Bước 2: Kiểm tra Variables
Đảm bảo template **CHỈ SỬ DỤNG** các variables này:

✅ **Variables được code gửi:**
```
{{to_email}}
{{from_name}}
{{from_email}}
{{phone}}
{{car_type}}
{{rental_type}}
{{duration}}
{{pickup_date}}
{{return_date}}
{{pickup_location}}
{{return_location}}
{{driver}}
{{services}}
{{special_requests}}
{{id_number}}
{{booking_date}}
{{booking_id}}
```

#### Bước 3: Xóa các variables KHÔNG có trong danh sách trên

Ví dụ nếu template có:
```
{{customer_name}}  ❌ XÓA (không tồn tại)
{{total_price}}    ❌ XÓA (không tồn tại)
{{from_name}}      ✅ GIỮ LẠI (đúng)
```

#### Bước 4: Save Template

---

### **CÁCH 2: Dùng Template Đơn Giản (NHANH NHẤT)**

Thay toàn bộ nội dung template bằng template đơn giản này:

#### **Subject:**
```
🚗 ĐƠN ĐẶT XE MỚI - {{car_type}} - {{from_name}}
```

#### **Content (Text mode - KHÔNG dùng HTML):**
```
═══════════════════════════════════════════════════════
🚗 THÔNG BÁO ĐƠN ĐẶT XE MỚI
═══════════════════════════════════════════════════════

📋 THÔNG TIN KHÁCH HÀNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Họ tên: {{from_name}}
• Email: {{from_email}}
• Điện thoại: {{phone}}
• CMND/CCCD: {{id_number}}

🚗 THÔNG TIN ĐẶT XE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dòng xe: {{car_type}}
• Loại thuê: {{rental_type}}
• Thời gian thuê: {{duration}}
• Ngày nhận xe: {{pickup_date}}
• Ngày trả xe: {{return_date}}
• Địa điểm nhận: {{pickup_location}}
• Địa điểm trả: {{return_location}}
• Tài xế: {{driver}}

💼 DỊCH VỤ BỔ SUNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{services}}

📝 YÊU CẦU ĐẶC BIỆT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{special_requests}}

⏰ THÔNG TIN BỔ SUNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Thời gian đặt: {{booking_date}}
• Mã booking: {{booking_id}}

═══════════════════════════════════════════════════════
Vui lòng liên hệ khách hàng trong vòng 24h
═══════════════════════════════════════════════════════
```

**Lưu ý:** 
- Dùng **Text mode** (không phải HTML mode)
- Nếu có nút "Switch to Text" hoặc "Plain Text", click vào
- KHÔNG dùng HTML cho đến khi test thành công

---

## 🚀 TEST SAU KHI SỬA

### Bước 1: Chạy qua HTTP Server
```bash
# Double click file:
START_TEST_SERVER.bat

# Hoặc nếu có Node.js:
npx http-server
```

### Bước 2: Mở trình duyệt
```
http://localhost:8000/TEST_EMAIL_BOOKING.html
```

### Bước 3: Click "Gửi Email Test"

### Bước 4: Kiểm tra Console
- Nếu thấy: `✅ Email sent successfully` → THÀNH CÔNG!
- Nếu vẫn lỗi 412 → Kiểm tra lại template có variable nào sai không

---

## 🔍 DEBUG CHI TIẾT

Sau khi sửa code, console sẽ hiển thị:
```
📧 Sending email with params: {
  from_name: "...",
  car_type: "...",
  ...
}
```

So sánh danh sách params này với variables trong template EmailJS.

**Nếu template có variable mà KHÔNG có trong params → XÓA variable đó**

---

## ✅ CHECKLIST

- [ ] Đã vào EmailJS Dashboard
- [ ] Đã mở template đúng (template_p1atqb7)
- [ ] Đã kiểm tra tất cả variables trong template
- [ ] Đã xóa/sửa variables không khớp
- [ ] Đã Save template
- [ ] Đã chạy START_TEST_SERVER.bat
- [ ] Đã test lại qua http://localhost:8000

---

## 📞 NẾU VẪN LỖI

Paste vào chat:
1. Screenshot template EmailJS (phần Content)
2. Message lỗi mới từ Console
3. Tôi sẽ debug tiếp

---

**Thử ngay cách 2 (template đơn giản) sẽ nhanh nhất! ⚡**
