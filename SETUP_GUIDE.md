# 🚀 Hướng Dẫn Setup Website Mercedes Rental

## 📋 Tổng Quan

Website cho thuê xe Mercedes với:
- ✅ Theme đen-trắng (đen chủ đạo)
- ✅ Animation tinh tế & sang trọng
- ✅ Comment system (localStorage)
- ✅ Email notification khi booking (EmailJS)
- ✅ Responsive trên mọi thiết bị

## 📁 Cấu Trúc Files

```
mercedes-rental/
├── index.html              # Trang chủ
├── booking.html            # Trang đặt xe
├── fleet.html              # Danh sách xe
├── contact.html            # Liên hệ
├── styles.css              # CSS chính (theme đen-trắng)
├── booking-styles.css      # CSS cho booking
├── script.js               # JavaScript chính
├── booking-script.js       # JS cho booking
├── fleet-script.js         # JS cho fleet
├── contact-script.js       # JS cho contact
├── reviews.js              # Comment system
├── emailjs-config.js       # Cấu hình EmailJS
├── README.md              # Tài liệu tổng quan
└── SETUP_GUIDE.md         # File này
```

## 🎨 Thay Đổi So Với Phiên Bản Cũ

### 1. Theme Màu Sắc
- **Trước:** Xám-đen-trắng (xám nhiều)
- **Sau:** Đen-trắng (đen chủ đạo)
- **File:** `styles.css` - dòng 1-15 (CSS Variables)

### 2. Stats Counter
- **Trước:** Hiển thị số liệu thống kê với counter animation
- **Sau:** ĐÃ BỎ - Không còn phần stats

### 3. Testimonials
- **Trước:** 3 review có sẵn với avatar
- **Sau:** Comment system - Người dùng có thể gửi đánh giá

### 4. Email Notification
- **Trước:** Không có
- **Sau:** Gửi email cho admin khi có booking (qua EmailJS)

## 🔧 Setup Cơ Bản (Không Cần Email)

### Bước 1: Download Files
```bash
# Tất cả files đã có sẵn trong thư mục
```

### Bước 2: Mở Website
**Cách 1: Mở trực tiếp**
- Double-click vào `index.html`

**Cách 2: Dùng Live Server (Khuyến nghị)**
- Cài VS Code + Extension "Live Server"
- Right-click `index.html` → "Open with Live Server"

**Cách 3: Python Server**
```bash
python -m http.server 8000
# Mở http://localhost:8000
```

### Bước 3: Thử Nghiệm
1. ✅ Xem trang chủ - Check theme đen-trắng
2. ✅ Viết comment/đánh giá
3. ✅ Đặt xe thử (thông tin lưu localStorage)
4. ✅ Xem các trang khác

---

## 📧 Setup Email Notification (Tùy Chọn)

### Tại Sao Cần EmailJS?
- Nhận email tự động khi có người đặt xe
- Không cần backend/server
- Miễn phí 200 emails/tháng
- Setup trong 10 phút

### Bước 1: Đăng Ký EmailJS (5 phút)

1. Truy cập: **https://www.emailjs.com/**
2. Click "Sign Up" (miễn phí)
3. Xác nhận email

### Bước 2: Tạo Email Service (2 phút)

1. Vào Dashboard → **Email Services**
2. Click **"Add New Service"**
3. Chọn **Gmail** (hoặc email provider bạn dùng)
4. **Kết nối email** của bạn (email nhận thông báo)
5. Copy **Service ID** (VD: `service_abc123`)

### Bước 3: Tạo Email Template (3 phút)

1. Vào Dashboard → **Email Templates**
2. Click **"Create New Template"**
3. **To Email:** `{{to_email}}`
4. **Subject:** `[Booking Mới] {{car_type}} - {{from_name}}`
5. **Content:** Paste template này:

```
Có booking mới từ website Mercedes Rental!

📋 THÔNG TIN KHÁCH HÀNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Họ tên: {{from_name}}
Email: {{from_email}}
Điện thoại: {{phone}}
CMND/CCCD: {{id_number}}

🚗 THÔNG TIN ĐẶT XE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Dòng xe: {{car_type}}
Loại thuê: {{rental_type}}
Thời gian: {{duration}}
Ngày nhận: {{pickup_date}}
Ngày trả: {{return_date}}
Địa điểm nhận: {{pickup_location}}
Địa điểm trả: {{return_location}}
Tài xế: {{driver}}

💼 DỊCH VỤ BỔ SUNG:
{{services}}

📝 YÊU CẦU ĐẶC BIỆT:
{{special_requests}}

⏰ Thời gian đặt: {{booking_date}}
🔖 Mã booking: {{booking_id}}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Vui lòng liên hệ khách hàng trong vòng 30 phút!
```

6. Click **Save** và copy **Template ID** (VD: `template_xyz789`)

### Bước 4: Lấy Public Key (1 phút)

1. Vào Dashboard → **Account**
2. Tìm phần **General**
3. Copy **Public Key** (VD: `AbCdEfGhIjKlMnOp`)

### Bước 5: Cập Nhật Config (1 phút)

Mở file **`emailjs-config.js`** và thay đổi:

```javascript
const EMAILJS_CONFIG = {
    // Paste Public Key từ bước 4
    publicKey: 'AbCdEfGhIjKlMnOp',
    
    // Paste Service ID từ bước 2
    serviceId: 'service_abc123',
    
    // Paste Template ID từ bước 3
    templateId: 'template_xyz789',
    
    // Email của bạn (nhận thông báo)
    adminEmail: 'your-email@gmail.com'
};
```

### Bước 6: Test Email (1 phút)

1. Mở website
2. Vào trang **Đặt Xe** (`booking.html`)
3. Điền form và submit
4. Kiểm tra email của bạn
5. Nếu không thấy → Check **Spam folder**

---

## 🎨 Tùy Chỉnh Website

### Thay Đổi Thông Tin Công Ty

**File:** `index.html`, `booking.html`, `fleet.html`, `contact.html`

```html
<!-- Số điện thoại -->
Tìm: 090 123 4567
Thay: [Số điện thoại của bạn]

<!-- Email -->
Tìm: info@mercedesrental.vn
Thay: [Email của bạn]

<!-- Địa chỉ -->
Tìm: 123 Nguyễn Huệ, Q1, TP.HCM
Thay: [Địa chỉ của bạn]

<!-- Tên công ty -->
Tìm: Mercedes Luxury Rental
Thay: [Tên công ty bạn]
```

### Thay Đổi Màu Sắc

**File:** `styles.css` (dòng 1-15)

```css
:root {
    /* Màu chính - đen */
    --color-primary: #000000;
    
    /* Muốn đen nhạt hơn */
    --color-primary: #1a1a1a;
    
    /* Muốn thêm accent khác */
    --color-accent: #ff0000;  /* Đỏ */
    --color-accent: #0066cc;  /* Xanh */
}
```

### Thay Đổi Giá Xe

**File:** `booking-script.js` (dòng 100-110)

```javascript
const prices = {
    's-class': { 
        hourly: 350000,    // Giá theo giờ
        daily: 2500000,    // Giá theo ngày
        monthly: 60000000  // Giá theo tháng
    },
    // ... các dòng xe khác
};
```

**File:** `index.html`, `fleet.html`
- Tìm các thẻ `<span class="price-amount">`
- Thay đổi giá trực tiếp trong HTML

### Thêm/Bớt Dòng Xe

**File:** `fleet.html`

Sao chép cấu trúc này và chỉnh sửa:

```html
<div class="car-card" data-category="sedan">
    <div class="car-image">
        <img src="URL_HÌNH_ẢNH" alt="Tên xe">
    </div>
    <div class="car-content">
        <h3 class="car-name">Tên Xe</h3>
        <!-- ... rest of card -->
    </div>
</div>
```

---

## 🐛 Xử Lý Lỗi Thường Gặp

### Email Không Gửi

**Nguyên nhân:**
1. Chưa cấu hình EmailJS
2. Sai Public Key/Service ID/Template ID
3. EmailJS chưa kích hoạt

**Giải pháp:**
1. Kiểm tra `emailjs-config.js`
2. Mở Console (F12) xem lỗi
3. Xem thông tin booking vẫn hiển thị trong Console

### Comments Không Hiện

**Nguyên nhân:**
- Browser block localStorage

**Giải pháp:**
1. Dùng HTTP (không dùng file://)
2. Enable localStorage trong browser settings

### Animation Không Mượt

**Nguyên nhân:**
- Máy yếu, nhiều tab

**Giải pháp:**
- Giảm số animations trong `styles.css`

---

## 📱 Tối Ưu Mobile

Website đã responsive nhưng bạn có thể:

1. **Test trên mobile thật**
2. **Tăng font size cho mobile:**

```css
@media (max-width: 640px) {
    body {
        font-size: 18px; /* Tăng từ 16px */
    }
}
```

---

## 🚀 Deploy Lên Internet

### Cách 1: GitHub Pages (Miễn Phí)

```bash
1. Tạo repo GitHub
2. Upload tất cả files
3. Settings → Pages → Enable
4. Truy cập: username.github.io/repo-name
```

### Cách 2: Netlify (Miễn Phí)

```bash
1. Đăng ký Netlify.com
2. Drag & drop folder vào
3. Done! Có URL ngay
```

### Cách 3: Vercel (Miễn Phí)

```bash
1. Đăng ký Vercel.com
2. Import từ GitHub
3. Auto deploy khi update
```

---

## 📊 Tracking & Analytics (Tùy Chọn)

### Google Analytics

1. Tạo GA4 property
2. Lấy Tracking ID
3. Thêm vào `<head>` của tất cả HTML files:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Bảo Mật

### Hiện Tại:
- ✅ XSS Prevention (escapeHtml)
- ✅ Input validation
- ✅ No SQL (dùng localStorage)

### Khi Có Backend:
- 🔐 Thêm CSRF protection
- 🔐 Rate limiting
- 🔐 Server-side validation
- 🔐 Database encryption

---

## 💡 Tips & Tricks

1. **Test nhiều trên mobile** - 70% traffic từ mobile
2. **Optimize images** - Dùng WebP format
3. **Monitor emails** - Check Spam folder thường xuyên
4. **Backup localStorage** - Export comments định kỳ
5. **SEO** - Thêm meta tags, sitemap.xml

---

## 📞 Support

**Nếu gặp vấn đề:**

1. Check Console (F12) xem lỗi
2. Đọc kỹ hướng dẫn trong `emailjs-config.js`
3. Test từng tính năng riêng lẻ
4. Google error message

**Common issues:**
- `emailjs is not defined` → Chưa load SDK
- `Invalid template` → Sai Template ID
- `403 Forbidden` → Sai Public Key

---

## ✅ Checklist Trước Khi Go Live

- [ ] Đã thay số điện thoại
- [ ] Đã thay email
- [ ] Đã thay địa chỉ
- [ ] Đã cấu hình EmailJS
- [ ] Đã test booking form
- [ ] Đã test trên mobile
- [ ] Đã thay hình ảnh (nếu cần)
- [ ] Đã test tất cả links
- [ ] Đã thêm Google Analytics (nếu muốn)
- [ ] Đã backup code

---

## 🎉 Hoàn Thành!

Website của bạn đã sẵn sàng. Chúc bạn kinh doanh thành công!

**Tính năng đặc biệt:**
- ⚡ Load cực nhanh (no backend)
- 📱 Mobile-friendly
- 🎨 Theme đen-trắng sang trọng
- 📧 Email notification tự động
- 💬 Comment system
- 🚀 Dễ deploy & maintain

---

**Version:** 2.0 - Black & White Theme
**Last Updated:** December 2024
