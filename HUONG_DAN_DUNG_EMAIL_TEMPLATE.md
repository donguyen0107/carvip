# 📧 HƯỚNG DẪN SỬ DỤNG EMAIL TEMPLATE CHUYÊN NGHIỆP

## 🎨 TEMPLATE ĐÃ TẠO:

File: **EMAIL_TEMPLATE_PROFESSIONAL.html**

**Đặc điểm:**
✅ Gradient tím giống website (#667eea → #764ba2)
✅ Responsive, hiển thị đẹp trên mọi thiết bị
✅ Layout chuyên nghiệp với sections rõ ràng
✅ CTA buttons để gọi/email khách hàng nhanh
✅ Màu sắc, font chữ đồng bộ với website

---

## 🚀 CÁCH SỬ DỤNG:

### **BƯỚC 1: Mở file template**
```
Mở file: EMAIL_TEMPLATE_PROFESSIONAL.html
```

### **BƯỚC 2: Copy toàn bộ code HTML**
1. Mở file bằng text editor (Notepad, VSCode)
2. Select All (Ctrl+A)
3. Copy (Ctrl+C)

### **BƯỚC 3: Vào EmailJS Template**
```
https://dashboard.emailjs.com/admin/templates
```

### **BƯỚC 4: Mở template của bạn**
- Click vào template đã tạo (template_xxx)

### **BƯỚC 5: Chuyển sang HTML mode**
- Tìm nút **"Edit HTML"** hoặc **"<>"** hoặc **"Source"**
- Click để chuyển sang chế độ HTML

### **BƯỚC 6: Paste code**
1. **XÓA HẾT** nội dung cũ
2. **PASTE** code từ EMAIL_TEMPLATE_PROFESSIONAL.html
3. Click **"Save"**

### **BƯỚC 7: Cập nhật Subject**

**Subject chuyên nghiệp:**
```
🚗 ĐƠN ĐẶT XE MỚI #{{booking_id}} | {{car_type}} | {{from_name}}
```

Hoặc ngắn gọn:
```
🚗 Booking #{{booking_id}} - {{car_type}}
```

---

## 🧪 TEST TEMPLATE:

### **Cách 1: Test trực tiếp**
```
http://localhost:8000/TEST_EMAIL_BOOKING.html
```
Click "Gửi Email Test" và check Gmail

### **Cách 2: Preview trong EmailJS**
1. Trong EmailJS template editor
2. Click nút **"Test it"** hoặc **"Preview"**
3. Điền sample data
4. Gửi test email

---

## 🎨 TÙY CHỈNH MÀU SẮC (NẾU CẦN):

Nếu muốn thay đổi màu gradient, tìm và sửa:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Màu hiện tại:**
- Primary: `#667eea` (Tím xanh)
- Secondary: `#764ba2` (Tím đậm)

**Thay bằng màu khác:**
```css
/* Ví dụ: Gradient xanh lá */
background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);

/* Ví dụ: Gradient đỏ cam */
background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
```

---

## 📋 CẤU TRÚC TEMPLATE:

### **1. Header (Gradient Banner)**
- Logo/Title
- Booking ID
- Màu gradient tím

### **2. Intro Message**
- Thông báo có đơn mới
- Nhắc nhở liên hệ trong 24h

### **3. Customer Info Section**
- Họ tên (highlight màu tím)
- Email (clickable)
- Điện thoại (clickable)
- CMND/CCCD

### **4. Booking Info Section**
- Dòng xe (highlight lớn)
- Loại thuê, thời gian
- Ngày nhận/trả (có icon 📅)
- Địa điểm (có icon 📍)
- Tài xế

### **5. Services Section**
- Danh sách dịch vụ bổ sung

### **6. Special Requests**
- Yêu cầu đặc biệt (italic style)

### **7. Booking Time**
- Thời gian đặt xe

### **8. Call-to-Action Buttons**
- 📞 Gọi ngay (gradient button)
- ✉️ Gửi email (outline button)

### **9. Footer**
- Thông tin công ty
- Copyright

---

## 💡 ƯU ĐIỂM TEMPLATE:

✅ **Responsive Design**
- Hiển thị đẹp trên Desktop
- Tự động điều chỉnh trên Mobile
- Email clients hỗ trợ: Gmail, Outlook, Apple Mail, etc.

✅ **Professional Layout**
- Sections rõ ràng
- Hierarchy thông tin hợp lý
- Dễ đọc, dễ scan thông tin

✅ **Brand Consistency**
- Màu sắc đồng bộ với website
- Gradient tím sang trọng
- Font chữ chuyên nghiệp

✅ **Interactive Elements**
- Click vào email → Mở mail app
- Click vào SĐT → Gọi điện
- CTA buttons nổi bật

✅ **Email Client Compatible**
- Dùng table-based layout (best practice)
- Inline CSS (tương thích mọi email client)
- Không dùng CSS classes phức tạp

---

## 📊 MẪU EMAIL SẼ NHẬN ĐƯỢC:

**Subject:**
```
🚗 ĐƠN ĐẶT XE MỚI #MB1704448123456 | Mercedes S-Class | Nguyễn Văn A
```

**Body:**
- Header gradient tím với logo
- Mã đơn nổi bật
- Thông tin khách hàng trong box gradient nhạt
- Thông tin xe với icons
- Buttons gọi/email màu gradient
- Footer chuyên nghiệp

---

## 🔧 TROUBLESHOOTING:

### ❌ Gradient không hiển thị trong Gmail?
**Giải pháp:** Gmail hỗ trợ gradient. Nếu không thấy:
1. Kiểm tra "Load images" đã bật
2. Hoặc dùng màu solid thay gradient

### ❌ Layout vỡ trên mobile?
**Giải pháp:** Template đã responsive. Nếu vẫn vỡ:
1. Kiểm tra width="600" trong table
2. Đảm bảo không thêm CSS class bên ngoài

### ❌ CTA buttons không click được?
**Giải pháp:** Kiểm tra:
1. `href="tel:{{phone}}"` cho button gọi
2. `href="mailto:{{from_email}}"` cho button email
3. Variables đã được điền đúng

---

## ✅ CHECKLIST HOÀN THÀNH:

- [ ] Đã copy code từ EMAIL_TEMPLATE_PROFESSIONAL.html
- [ ] Đã paste vào EmailJS template (HTML mode)
- [ ] Đã update Subject
- [ ] Đã Save template
- [ ] Đã test gửi email
- [ ] Đã nhận được email và kiểm tra layout
- [ ] Email hiển thị đẹp trên Desktop
- [ ] Email hiển thị đẹp trên Mobile
- [ ] Gradient màu tím hiển thị đúng
- [ ] CTA buttons hoạt động

---

## 🎉 KẾT QUẢ:

Sau khi setup xong, mỗi email booking bạn nhận sẽ:
- 🎨 Chuyên nghiệp, màu sắc đồng nhất với website
- 📱 Responsive, đẹp trên mọi thiết bị
- ⚡ Dễ đọc, dễ xử lý đơn hàng
- 🚀 Tạo ấn tượng tốt với brand

---

**Hãy paste template vào EmailJS và test ngay!** 🚀
