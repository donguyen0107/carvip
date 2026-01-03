# Mercedes Luxury Rental Website

Website cho thuê xe Mercedes cao cấp tại Hồ Chí Minh với thiết kế hiện đại, animation tinh tế và tính năng đặt xe trực tuyến.

## 🎨 Đặc Điểm Thiết Kế

### Theme Màu Sắc
- **Màu chính:** Xám - Đen - Trắng
- **Gradient:** Linear gradient từ đen sang xám
- **Accent:** Các điểm nhấn tinh tế để làm nổi bật

### Animation & Hiệu Ứng
- ✨ Fade in/out mượt mà
- 🎭 Parallax effect trên hero section
- 🔄 Smooth scrolling giữa các section
- 🎯 Hover effects trên cards và buttons
- 📊 Counter animation cho số liệu thống kê
- 🖱️ Mouse parallax trên các card
- 💫 Scroll-triggered animations

## 📁 Cấu Trúc File

```
mercedes-rental/
├── index.html              # Trang chủ (Single page với sections)
├── booking.html            # Trang đặt xe (Form đa bước)
├── fleet.html              # Danh sách xe (Với filter & search)
├── contact.html            # Trang liên hệ (Form + FAQ)
├── styles.css              # CSS chính
├── booking-styles.css      # CSS riêng cho booking
├── script.js               # JavaScript chính
├── booking-script.js       # JS cho booking form
├── fleet-script.js         # JS cho fleet page
├── contact-script.js       # JS cho contact page
└── README.md              # File này
```

## 🚀 Tính Năng Chính

### Trang Chủ (index.html)
- **Hero Section:** Banner chính với CTA buttons
- **Stats Counter:** Số liệu thống kê với animation
- **Fleet Preview:** Hiển thị 3 xe nổi bật
- **Services:** 6 dịch vụ chính
- **Pricing:** 3 gói dịch vụ (giờ/ngày/tháng)
- **Testimonials:** Đánh giá khách hàng
- **CTA Section:** Kêu gọi hành động
- **Footer:** Thông tin liên hệ đầy đủ

### Trang Đặt Xe (booking.html)
- **Multi-step Form:** 3 bước đặt xe
  1. Chọn xe và thời gian
  2. Thông tin cá nhân
  3. Dịch vụ bổ sung
- **Price Calculator:** Tính giá tự động
- **Live Summary:** Tóm tắt đơn hàng realtime
- **Date Picker:** Chọn ngày giờ nhận/trả xe
- **Additional Services:** Chọn dịch vụ thêm
- **Promo Code:** Nhập mã giảm giá
- **Form Validation:** Kiểm tra dữ liệu đầu vào

### Trang Dòng Xe (fleet.html)
- **Full Fleet Display:** 6 dòng xe (S/E/C-Class, GLS/GLE/GLC)
- **Search Function:** Tìm kiếm theo tên
- **Category Filter:** Lọc Sedan/SUV
- **Detailed Specs:** Thông số kỹ thuật chi tiết
- **Direct Booking:** Link trực tiếp đến booking

### Trang Liên Hệ (contact.html)
- **Contact Info Cards:** 4 card thông tin liên hệ
- **Contact Form:** Form gửi tin nhắn
- **Google Maps:** Bản đồ vị trí văn phòng
- **FAQ Section:** 6 câu hỏi thường gặp với accordion
- **Social Media Links:** Kết nối mạng xã hội

## 🛠️ Công Nghệ Sử Dụng

- **HTML5:** Semantic markup
- **CSS3:** Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript:** ES6+, DOM manipulation
- **Font Awesome 6:** Icons
- **Google Fonts:** Segoe UI (system font)
- **Unsplash:** Ảnh demo chất lượng cao

## 📱 Responsive Design

Website được tối ưu cho tất cả thiết bị:
- 📱 Mobile: < 640px
- 📱 Tablet: 640px - 968px
- 💻 Desktop: > 968px

## 🎯 Các Tính Năng JavaScript

### Script.js (Chính)
- Header scroll effect
- Mobile navigation
- Smooth scrolling
- Active nav link detection
- Counter animation
- Scroll animations
- Parallax effects
- Back to top button
- Lazy loading images
- Price calculator
- Form validation helpers

### Booking-script.js
- Multi-step form navigation
- Form validation per step
- Auto-calculate return date
- Price calculation with discounts
- Service selection
- Summary update realtime
- Promo code validation
- Form data persistence
- Modal handling

### Fleet-script.js
- Search functionality
- Category filtering
- Dynamic car display
- Animation on filter

### Contact-script.js
- Contact form submission
- FAQ accordion
- Modal handling
- Form data storage

## 🎨 Customization

### Thay Đổi Màu Sắc
Chỉnh sửa trong `styles.css`:

```css
:root {
    --color-primary: #1a1a1a;      /* Màu chính */
    --color-secondary: #2d2d2d;    /* Màu phụ */
    --color-accent: #404040;       /* Màu nhấn */
    --color-light: #f5f5f5;        /* Nền sáng */
}
```

### Thay Đổi Thông Tin
- **Logo:** Thay đổi trong class `.nav-logo`
- **Số điện thoại:** Tìm `090 123 4567` và thay thế
- **Email:** Tìm `info@mercedesrental.vn` và thay thế
- **Địa chỉ:** Tìm `123 Nguyễn Huệ` và thay thế

### Thêm/Sửa Xe
Trong `fleet.html`, sao chép cấu trúc `.car-card` và chỉnh sửa:
- Tên xe
- Mô tả
- Hình ảnh (URL)
- Thông số kỹ thuật
- Giá
- Link booking

## 📦 Cài Đặt & Sử Dụng

### Cách 1: Mở Trực Tiếp
1. Download toàn bộ files
2. Mở `index.html` trong trình duyệt

### Cách 2: Dùng Live Server (Khuyến nghị)
1. Cài đặt VS Code
2. Cài extension "Live Server"
3. Click chuột phải vào `index.html`
4. Chọn "Open with Live Server"

### Cách 3: Dùng Python Server
```bash
python -m http.server 8000
```
Mở browser tại: `http://localhost:8000`

## 🌐 Browser Support

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

## 📝 TODO / Cải Tiến Tương Lai

- [ ] Backend integration (Node.js/PHP)
- [ ] Database cho xe và booking
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support
- [ ] Performance optimization
- [ ] SEO optimization

## 🔒 Bảo Mật

- Form validation phía client
- XSS prevention (cần thêm server-side)
- CSRF protection (khi có backend)
- Data sanitization

## 📄 License

Dự án này được tạo cho mục đích demo và học tập.

## 👨‍💻 Phát Triển Bởi

Rovo Dev - AI Assistant

## 📞 Liên Hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua các kênh đã cung cấp trong website.

---

**Lưu ý:** Website này sử dụng hình ảnh từ Unsplash cho mục đích demo. 
Khi triển khai thực tế, hãy sử dụng hình ảnh thật của dịch vụ.
