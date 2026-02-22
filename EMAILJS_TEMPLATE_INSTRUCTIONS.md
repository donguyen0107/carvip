# 📧 EmailJS Template Setup Instructions

## ⚠️ QUAN TRỌNG: Conditional Fields

EmailJS **KHÔNG HỖ TRỢ** conditional logic như `{{#if}}` trong template!

Do đó, tôi đã chuẩn bị **2 giải pháp** cho bạn:

---

## ✅ GIẢI PHÁP 1: Simple Template (KHUYẾN NGHỊ)

Vì EmailJS không hỗ trợ `{{#if}}`, hãy dùng template đơn giản hiển thị tất cả:

### Template HTML cho EmailJS:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px; text-align: center; color: #ffffff; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section-title { color: #000000; font-size: 18px; font-weight: 700; border-bottom: 2px solid #000000; padding-bottom: 10px; margin-bottom: 15px; }
        .info-row { padding: 8px; }
        .info-row:nth-child(even) { background-color: #f9f9f9; }
        .label { display: inline-block; width: 140px; color: #666666; font-weight: 600; }
        .value { color: #000000; font-weight: 700; }
        .price-box { background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 20px; border-radius: 8px; text-align: center; color: #ffffff; }
        .footer { background-color: #000000; padding: 30px; text-align: center; color: #cccccc; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 style="margin: 0; font-size: 32px; letter-spacing: 2px;">BOOKCARVIP</h1>
            <p style="margin: 10px 0 0; font-size: 14px;">LUXURY CAR RENTAL SERVICE</p>
        </div>

        <!-- Notification -->
        <div style="background: linear-gradient(90deg, #ffffff 0%, #e8e8e8 50%, #ffffff 100%); padding: 20px; text-align: center; border-bottom: 3px solid #000000;">
            <h2 style="margin: 0; color: #000000; font-size: 24px;">🎉 New Booking Received!</h2>
            <p style="margin: 5px 0 0; color: #666666;">Booking ID: <strong>{{booking_id}}</strong></p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Customer Info -->
            <div class="section">
                <div class="section-title">👤 Customer Information</div>
                <div class="info-row">
                    <span class="label">Full Name:</span>
                    <span class="value">{{from_name}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">{{from_email}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Phone:</span>
                    <span class="value">{{phone}}</span>
                </div>
            </div>

            <!-- Booking Details -->
            <div class="section">
                <div class="section-title">🚗 Booking Details</div>
                <div class="info-row">
                    <span class="label">Car Type:</span>
                    <span class="value">{{car_type}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Rental Type:</span>
                    <span class="value">{{rental_type}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Duration:</span>
                    <span class="value">{{duration}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Destination:</span>
                    <span class="value">{{destination}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Pickup Date:</span>
                    <span class="value">{{pickup_date}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Return Date:</span>
                    <span class="value">{{return_date}}</span>
                </div>
            </div>

            <!-- Location -->
            <div class="section">
                <div class="section-title">📍 Location Details</div>
                <div class="info-row">
                    <span class="label">Pickup:</span>
                    <span class="value">{{pickup_location}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Return:</span>
                    <span class="value">{{return_location}}</span>
                </div>
            </div>

            <!-- Special Requests -->
            <div class="section">
                <div class="section-title">💬 Special Requests</div>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #000000;">
                    {{special_requests}}
                </div>
            </div>

            <!-- Promo Code -->
            <div class="section">
                <div class="info-row">
                    <span class="label">Promo Code:</span>
                    <span class="value" style="color: #27ae60;">{{promo_code}}</span>
                </div>
            </div>

            <!-- Total Price -->
            <div class="price-box">
                <p style="margin: 0 0 5px; font-size: 14px; letter-spacing: 1px;">TOTAL PRICE</p>
                <p style="margin: 0; font-size: 32px; font-weight: 900;">{{total_price}}</p>
            </div>

            <!-- Timestamp -->
            <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 6px; text-align: center;">
                <p style="margin: 0; color: #666666; font-size: 12px;">
                    Received on: <strong>{{booking_date}}</strong>
                </p>
            </div>

            <!-- Action Required -->
            <div style="margin-top: 20px; background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; text-align: center;">
                <h3 style="margin: 0 0 10px; color: #856404;">⚠️ ACTION REQUIRED</h3>
                <p style="margin: 0; color: #856404; font-size: 14px;">
                    Please contact the customer within 30 minutes.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p style="margin: 0 0 10px; font-size: 14px; color: #ffffff; font-weight: 700;">BOOKCARVIP</p>
            <p style="margin: 0 0 15px;">Melody Residences, 869 Âu Cơ, TP.HCM</p>
            <p style="margin: 0;">📞 0903 776 578 | ✉️ infobook@carvip.vn</p>
        </div>
    </div>
</body>
</html>
```

### Kết quả:
- Hourly Rental: Hiển thị "N/A" cho Destination
- Airport Transfer: Hiển thị "N/A" cho Duration và Return Date

**Ưu điểm:** Đơn giản, hoạt động 100% với EmailJS
**Nhược điểm:** Hiển thị "N/A" cho các trường không dùng

---

## ✅ GIẢI PHÁP 2: Use Plain Text Template

Template text đơn giản hơn:

```
================================================================
🎉 NEW BOOKING - BOOKCARVIP
================================================================

BOOKING ID: {{booking_id}}
DATE: {{booking_date}}

CUSTOMER:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

BOOKING:
- Car: {{car_type}}
- Type: {{rental_type}}
- Duration: {{duration}}
- Destination: {{destination}}
- Pickup: {{pickup_date}}
- Return: {{return_date}}

LOCATION:
- Pickup: {{pickup_location}}
- Return: {{return_location}}

SPECIAL REQUESTS:
{{special_requests}}

PROMO: {{promo_code}}

TOTAL: {{total_price}}

⚠️ Contact customer within 30 minutes!
================================================================
```

---

## 📝 Cách Setup trong EmailJS Dashboard

1. Đăng nhập: https://dashboard.emailjs.com/
2. Vào **Email Templates** → **Create New Template**
3. Copy một trong 2 template trên
4. **Subject**: `🚗 New Booking #{{booking_id}} - {{from_name}} - {{car_type}}`
5. **To Email**: `{{to_email}}`
6. Paste HTML hoặc Text template vào phần **Content**
7. Click **Save** và copy **Template ID**
8. Paste Template ID vào `emailjs-config.js`

---

## 🎯 Template Variables Used

```
{{booking_id}}         - BK1234567890
{{booking_date}}       - 02/22/2026, 08:30 PM
{{from_name}}          - Customer Name
{{from_email}}         - customer@email.com
{{phone}}              - +84903776578
{{car_type}}           - Mercedes E-Class
{{rental_type}}        - Hourly Rental / Airport Transfer
{{duration}}           - 6 hours (or N/A)
{{destination}}        - TSN Airport → Hotel HCMC (or N/A)
{{pickup_date}}        - 02/23/2026, 10:00 AM
{{return_date}}        - 02/23/2026, 04:00 PM (or N/A)
{{pickup_location}}    - Address
{{return_location}}    - Address
{{special_requests}}   - Customer notes (or None)
{{promo_code}}         - PROMO123 (or None)
{{total_price}}        - $150
{{to_email}}           - donguyen072010@gmail.com
```

---

## ✅ Done!

Sau khi setup xong, form booking sẽ gửi email tự động với đầy đủ thông tin!
