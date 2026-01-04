# 🎠 CAROUSEL HERO - HƯỚNG DẪN SỬ DỤNG

## ✅ ĐÃ THÊM VÀO TRANG HOME

Carousel tự động chạy ảnh giống website The Time Capsule đã được tích hợp vào hero section của trang index.html

---

## 📂 CẤU TRÚC FILES

```
project/
├── index.html          (đã thêm carousel HTML)
├── carousel.css        (styling cho carousel)
├── carousel.js         (JavaScript functionality)
└── sources/
    └── carousel/       (8 ảnh carousel)
        ├── MQF02855.jpg
        ├── MQF02912.jpg
        ├── ChatGPT Image 23_12_20 22 thg 12, 2025.png
        ├── V250 HL2.jpg
        ├── HUNG LONG S3.jpg
        ├── z7260580908404_...jpg
        ├── z7356223047590_...jpg
        └── z6904030104678_...jpg
```

---

## 🎯 TÍNH NĂNG

### 🔄 **Autoplay**
- Tự động chuyển slide sau **5 giây**
- Pause khi hover chuột lên carousel
- Resume khi chuột rời khỏi carousel
- Tự động stop khi tab không active (performance)

### 🎮 **Navigation**

**Desktop:**
- ← → Nút prev/next (mũi tên tròn)
- Indicators dưới cùng (8 chấm tròn)
- Keyboard: Arrow Left/Right

**Mobile:**
- Swipe left/right
- Touch-friendly indicators
- Nav buttons ẩn trên màn hình nhỏ

### ✨ **Hiệu ứng**

**Fade Transition:**
- Smooth fade in/out (1.5s)
- Overlap animation giữa slides

**Ken Burns Effect:**
- Zoom nhẹ từ 1x → 1.1x
- Animation 15s infinite alternate
- Tạo cảm giác sống động

**Gradient Overlay:**
- Màu tím gradient (#667eea → #764ba2)
- Đồng bộ với brand identity
- Opacity 0.7 để content rõ ràng

---

## 🎨 THIẾT KẾ

### **Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│         [← PREV]         [NEXT →]      │
│                                         │
│                                         │
│            HERO CONTENT                 │
│         (Text & Buttons)                │
│                                         │
│      ○ ━ ○ ○ ○ ○ ○ ○ ○                │
│         (Indicators)                    │
└─────────────────────────────────────────┘
```

### **Z-Index Layers:**
```
z-index: 1  → Carousel images
z-index: 2  → Dark gradient overlay
z-index: 3  → Hero content (text)
z-index: 4  → Navigation & indicators
```

---

## 📱 RESPONSIVE

### **Desktop (> 768px):**
- Full navigation buttons (50px)
- 8 indicators visible
- Keyboard support
- Hover effects

### **Tablet (480px - 768px):**
- Smaller nav buttons (40px)
- Smaller indicators
- Touch + Click support

### **Mobile (< 480px):**
- Nav buttons hidden
- Tiny indicators (8px)
- Swipe only
- Touch-optimized

---

## ⚙️ TÙY CHỈNH

### **Thay đổi tốc độ autoplay:**

File: `carousel.js` (line 11)
```javascript
this.autoplayDelay = 5000; // 5 seconds → Thay số này
```

**Gợi ý:**
- 3000 = 3 giây (nhanh)
- 5000 = 5 giây (vừa phải) ← hiện tại
- 7000 = 7 giây (chậm)

### **Thay đổi transition duration:**

File: `carousel.css` (line 27)
```css
transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out;
```

Và file: `carousel.js` (line 79)
```javascript
setTimeout(() => {
    this.isTransitioning = false;
}, 1500); // ← Phải khớp với CSS
```

### **Thay đổi màu gradient overlay:**

File: `carousel.css` (line 60-64)
```css
background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.7) 0%,  /* ← Màu 1 */
    rgba(118, 75, 162, 0.7) 100%  /* ← Màu 2 */
);
```

**Thay đổi opacity:**
- 0.5 = Nhạt hơn (ảnh nền rõ hơn)
- 0.7 = Vừa phải ← hiện tại
- 0.9 = Đậm hơn (content nổi bật)

### **Thêm/bớt slides:**

**1. Thêm HTML slide:**

File: `index.html` trong `.carousel-track`
```html
<div class="carousel-slide">
    <img src="sources/carousel/anh-moi.jpg" alt="Description">
</div>
```

**2. Thêm indicator:**

File: `index.html` trong `.carousel-indicators`
```html
<button class="indicator" data-slide="8"></button>
```

**3. Update JavaScript:**
Không cần thay đổi gì! JS tự động detect số slides.

---

## 🔍 TROUBLESHOOTING

### ❌ Carousel không hiển thị

**Kiểm tra:**
1. Files `carousel.css` và `carousel.js` đã load chưa?
2. Ảnh trong `sources/carousel/` có tồn tại không?
3. Console (F12) có lỗi không?

**Fix:**
- Hard refresh: Ctrl + Shift + R
- Check Network tab xem file nào 404

### ❌ Carousel không chạy tự động

**Kiểm tra Console:**
```
✅ Hero Carousel initialized with 8 slides
```

Nếu không thấy → `carousel.js` chưa load

**Fix:**
- Check `<script src="carousel.js"></script>` trong index.html
- Đảm bảo load AFTER `script.js`

### ❌ Navigation buttons không hoạt động

**Nguyên nhân:**
- JavaScript error
- Event listeners chưa attach

**Fix:**
- Mở Console xem lỗi
- Reload trang
- Check `carousel.js` có syntax error không

### ❌ Hiệu ứng lag/giật

**Nguyên nhân:**
- Ảnh quá nặng
- Browser performance

**Fix:**
1. Optimize ảnh (compress, resize)
2. Giảm transition duration
3. Disable Ken Burns effect:

```css
/* carousel.css - Comment out: */
/* .carousel-slide.active img {
    animation: kenBurns 15s ease-out infinite alternate;
} */
```

### ❌ Overlay quá đậm/nhạt

**Fix trong `carousel.css`:**
```css
.hero-overlay {
    background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.5) 0%,   /* ← Giảm opacity */
        rgba(118, 75, 162, 0.5) 100%
    );
}
```

---

## 📊 PERFORMANCE

### **Tối ưu hóa:**

✅ **Đã implement:**
- `will-change` cho GPU acceleration
- `backface-visibility: hidden`
- Pause khi tab không active
- Touch passive listeners
- CSS transitions (không dùng JS animation)

✅ **Best practices:**
- Preload ảnh
- Lazy load off-screen slides
- Optimize ảnh (WebP format)
- Compress images

### **Ảnh tối ưu:**

**Kích thước khuyến nghị:**
- Width: 1920px
- Height: 1080px
- Format: WebP hoặc JPG
- Quality: 70-85%
- Size: < 200KB mỗi ảnh

**Tools:**
- TinyPNG / TinyJPG
- ImageOptim
- Squoosh.app

---

## 🎓 CODE STRUCTURE

### **carousel.css**
- Hero layout override
- Carousel container
- Slide animations
- Navigation styling
- Indicators styling
- Responsive breakpoints

### **carousel.js**
- Class `HeroCarousel`
- Auto initialization
- Event listeners
- Autoplay logic
- Touch/swipe support
- Keyboard navigation
- Performance optimization

---

## 🚀 TESTING

### **Checklist:**

Desktop:
- [ ] Carousel tự động chạy
- [ ] Click prev/next buttons hoạt động
- [ ] Click indicators hoạt động
- [ ] Keyboard arrows hoạt động
- [ ] Hover pause autoplay
- [ ] Smooth transitions
- [ ] Ken Burns effect

Mobile:
- [ ] Swipe left/right hoạt động
- [ ] Touch indicators hoạt động
- [ ] Responsive layout
- [ ] Performance OK (không lag)

Browser:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📝 NOTES

- Carousel chỉ có trên **trang home** (index.html)
- Không ảnh hưởng đến các trang khác
- Có thể tắt autoplay bằng cách comment dòng trong JS
- Compatible với tất cả trình duyệt hiện đại

---

## 🎉 KẾT QUẢ

Carousel hero chuyên nghiệp với:
- ✅ 8 slides tự động chạy
- ✅ Multiple navigation methods
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Performance optimized
- ✅ Giống The Time Capsule style

---

**Enjoy your new carousel! 🎠**
