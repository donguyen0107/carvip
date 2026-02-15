# 📧 HƯỚNG DẪN SETUP EMAIL NHẬN THÔNG TIN ĐẶT XE

## 🎯 Tổng quan
Khi khách hàng đặt xe trên website, thông tin đơn hàng sẽ tự động được gửi về email của bạn qua dịch vụ EmailJS (miễn phí 200 email/tháng).

---

## ⚡ SETUP NHANH (5-10 phút)

### BƯỚC 1: Đăng ký EmailJS
1. Truy cập: **https://www.emailjs.com/**
2. Click **"Sign Up"** (Đăng ký miễn phí)
3. Điền thông tin:
   - Email của bạn
   - Password
   - Tên công ty: **Mercedes Booking**
4. Xác nhận email (check inbox/spam)

---

### BƯỚC 2: Tạo Email Service
1. Sau khi đăng nhập, vào **"Email Services"**
2. Click **"Add New Service"**
3. Chọn **Gmail** (khuyến nghị) hoặc email provider khác
4. Click **"Connect Account"**
5. Đăng nhập Gmail của bạn và cho phép quyền truy cập
6. **LƯU LẠI SERVICE ID** (dạng: service_xxxxxxx)

---

### BƯỚC 3: Tạo Email Template
1. Vào **"Email Templates"**
2. Click **"Create New Template"**
3. Đặt tên template: **"Booking Notification"**

**4. Điền thông tin template:**

**Subject (Tiêu đề email):**
```
🚗 ĐƠN ĐẶT XE MỚI - {{car_type}} - {{from_name}}
```

**Content (Nội dung email):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; 
                   box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .section-title { color: #667eea; font-size: 18px; font-weight: bold; 
                         margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .info-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #555; display: inline-block; width: 150px; }
        .value { color: #333; }
        .footer { text-align: center; color: #999; padding: 20px; font-size: 12px; }
        .booking-id { background: #667eea; color: white; padding: 10px 20px; 
                      border-radius: 5px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 ĐƠN ĐẶT XE MỚI</h1>
            <div class="booking-id">Mã đơn: {{booking_id}}</div>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">👤 THÔNG TIN KHÁCH HÀNG</div>
                <div class="info-row">
                    <span class="label">Họ tên:</span>
                    <span class="value">{{from_name}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">{{from_email}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Điện thoại:</span>
                    <span class="value">{{phone}}</span>
                </div>
                <div class="info-row">
                    <span class="label">CMND/CCCD:</span>
                    <span class="value">{{id_number}}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">🚗 THÔNG TIN ĐẶT XE</div>
                <div class="info-row">
                    <span class="label">Dòng xe:</span>
                    <span class="value">{{car_type}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Loại thuê:</span>
                    <span class="value">{{rental_type}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Thời gian thuê:</span>
                    <span class="value">{{duration}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Ngày nhận xe:</span>
                    <span class="value">{{pickup_date}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Ngày trả xe:</span>
                    <span class="value">{{return_date}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Địa điểm nhận:</span>
                    <span class="value">{{pickup_location}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Địa điểm trả:</span>
                    <span class="value">{{return_location}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Tài xế:</span>
                    <span class="value">{{driver}}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">💼 DỊCH VỤ BỔ SUNG</div>
                <p>{{services}}</p>
            </div>

            <div class="section">
                <div class="section-title">📝 YÊU CẦU ĐẶC BIỆT</div>
                <p>{{special_requests}}</p>
            </div>

            <div class="section">
                <div class="section-title">⏰ THÔNG TIN BỔ SUNG</div>
                <div class="info-row">
                    <span class="label">Thời gian đặt:</span>
                    <span class="value">{{booking_date}}</span>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Email này được gửi tự động từ hệ thống đặt xe Mercedes</p>
            <p>Vui lòng liên hệ khách hàng trong vòng 24h</p>
        </div>
    </div>
</body>
</html>
```

5. Click **"Save"** và **LƯU LẠI TEMPLATE ID** (dạng: template_xxxxxxx)

---

### BƯỚC 4: Lấy Public Key
1. Vào **"Account"** (góc trên bên phải)
2. Tìm mục **"General"**
3. **Copy Public Key** (dạng: xxxxxxxxxxxxxx)

---

### BƯỚC 5: Cập nhật Code
Mở file **`emailjs-config.js`** và thay đổi:

```javascript
const EMAILJS_CONFIG = {
    // Thay YOUR_PUBLIC_KEY bằng Public Key từ Bước 4
    publicKey: 'YOUR_PUBLIC_KEY',  // ← THAY ĐỔI TẠI ĐÂY
    
    // Thay YOUR_SERVICE_ID bằng Service ID từ Bước 2
    serviceId: 'YOUR_SERVICE_ID',  // ← THAY ĐỔI TẠI ĐÂY
    
    // Thay YOUR_TEMPLATE_ID bằng Template ID từ Bước 3
    templateId: 'YOUR_TEMPLATE_ID',  // ← THAY ĐỔI TẠI ĐÂY
    
    // Thay bằng email của bạn (email nhận thông báo)
    adminEmail: 'YOUR_ADMIN_EMAIL@example.com'  // ← THAY ĐỔI TẠI ĐÂY
};
```

**Ví dụ sau khi thay:**
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'abcdefghij1234567890',
    serviceId: 'service_abc1234',
    templateId: 'template_xyz5678',
    adminEmail: 'youremail@gmail.com'
};
```

---

### BƯỚC 6: Test
1. Mở file **`booking.html`** trong trình duyệt
2. Điền form đặt xe
3. Submit form
4. Kiểm tra email của bạn (cả inbox và spam)

✅ **Nếu nhận được email → THÀNH CÔNG!**

---

## 🔧 TROUBLESHOOTING (Xử lý lỗi)

### ❌ Không nhận được email

**1. Kiểm tra Console Log:**
- Mở trình duyệt → F12 → Console
- Tìm message: `✅ Email sent successfully` hoặc `❌ Error sending email`

**2. Kiểm tra cấu hình:**
```javascript
// Đảm bảo không còn dòng nào có YOUR_...
publicKey: 'YOUR_PUBLIC_KEY',  // ❌ SAI
publicKey: 'abcd1234xyz',      // ✅ ĐÚNG
```

**3. Kiểm tra Spam/Junk folder**
- Email có thể bị đánh dấu spam lần đầu tiên

**4. Kiểm tra EmailJS Dashboard:**
- Vào https://dashboard.emailjs.com/admin
- Xem mục "Logs" để check email đã được gửi chưa

**5. Kiểm tra giới hạn:**
- Miễn phí: 200 emails/tháng
- Nếu vượt quá, cần upgrade plan

---

## 📊 MẪU EMAIL NHẬN ĐƯỢC

```
Tiêu đề: 🚗 ĐƠN ĐẶT XE MỚI - Mercedes S-Class - Nguyễn Văn A

Mã đơn: MB1704448123456

👤 THÔNG TIN KHÁCH HÀNG
- Họ tên: Nguyễn Văn A
- Email: customer@gmail.com
- Điện thoại: 0901234567
- CMND/CCCD: 079012345678

🚗 THÔNG TIN ĐẶT XE
- Dòng xe: Mercedes S-Class
- Loại thuê: Theo ngày
- Thời gian thuê: 3
- Ngày nhận xe: 05/01/2026 09:00
- Ngày trả xe: 08/01/2026 09:00
- Địa điểm nhận: Sân bay Tân Sơn Nhất
- Địa điểm trả: Sân bay Tân Sơn Nhất
- Tài xế: Có tài xế

💼 DỊCH VỤ BỔ SUNG
baby-seat, wifi, airport

📝 YÊU CẦU ĐẶC BIỆT
Cần xe màu đen, sạch sẽ

⏰ Thời gian đặt: 05/01/2026, 08:30:00
```

---

## 💰 CHI PHÍ

- **Miễn phí**: 200 emails/tháng
- **Không cần**: Credit card, Backend server
- **Upgrade** (nếu cần nhiều hơn):
  - Basic: $7/tháng (1,000 emails)
  - Pro: $15/tháng (5,000 emails)

---

## 📝 LƯU Ý QUAN TRỌNG

1. **Bảo mật Keys:**
   - Không public các keys lên GitHub public repo
   - Nếu cần, thêm `emailjs-config.js` vào `.gitignore`

2. **Backup thông tin:**
   - Lưu lại Service ID, Template ID, Public Key
   - Screenshot cấu hình để dễ tham khảo sau

3. **Test thường xuyên:**
   - Sau khi setup, test ngay
   - Test lại sau mỗi lần thay đổi template

4. **Email spam:**
   - Lần đầu email có thể vào spam
   - Đánh dấu "Not spam" để các email sau vào inbox

---

## 🆘 HỖ TRỢ

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Support**: support@emailjs.com
- **Video hướng dẫn**: https://www.youtube.com/results?search_query=emailjs+tutorial

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Đã đăng ký EmailJS
- [ ] Đã tạo Email Service và lưu Service ID
- [ ] Đã tạo Email Template và lưu Template ID
- [ ] Đã copy Public Key
- [ ] Đã cập nhật file `emailjs-config.js`
- [ ] Đã test và nhận được email thành công
- [ ] Đã kiểm tra email trong spam folder (nếu cần)

---

🎉 **HOÀN THÀNH!** Giờ đây mỗi khi có khách đặt xe, bạn sẽ nhận email ngay lập tức!
