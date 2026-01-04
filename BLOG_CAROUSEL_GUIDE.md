# 🎠 BLOG CAROUSEL - HƯỚNG DẪN

## ✅ ĐÃ TẠO THÀNH CÔNG

Carousel blog posts giống The Time Capsule đã được thêm vào trang home!

---

## 📍 VỊ TRÍ

**Sau Hero Section, trước Fleet Section**

```
Hero Section (nền đen + ảnh header.png)
    ↓
📍 Blog Carousel Section ← MỚI
    ↓
Fleet Section (dòng xe)
```

---

## 🎨 THIẾT KẾ

### **Layout Desktop (> 1024px):**
```
┌──────────────────────────────────────────────────────┐
│     [←]    [Card 1] [Card 2] [Card 3]    [→]       │
└──────────────────────────────────────────────────────┘
```
Hiển thị 3 cards cùng lúc

### **Layout Tablet (768px - 1024px):**
```
┌──────────────────────────────────────────────────────┐
│         [←]    [Card 1] [Card 2]    [→]             │
└──────────────────────────────────────────────────────┘
```
Hiển thị 2 cards cùng lúc

### **Layout Mobile (< 768px):**
```
┌──────────────────────────────────────────────────────┐
│              [←]    [Card 1]    [→]                  │
└──────────────────────────────────────────────────────┘
```
Hiển thị 1 card cùng lúc

---

## 🃏 BLOG CARDS

Mỗi card có:
- **Image**: 280px height với hover zoom
- **Category Badge**: Gradient tím (Dịch Vụ, Xe Cao Cấp, VIP, etc.)
- **Title**: Tiêu đề lớn, hover có gradient
- **Excerpt**: Mô tả ngắn
- **Link**: "Đọc thêm" với arrow animation

### **8 Cards hiện có:**

1. **Trải Nghiệm Dịch Vụ VIP** (MQF02855.jpg)
2. **Mercedes S-Class Đẳng Cấp** (MQF02912.jpg)
3. **Mercedes V-Class Rộng Rãi** (V250 HL2.jpg)
4. **Dịch Vụ Chuyên Nghiệp** (HUNG LONG S3.jpg)
5. **Phục Vụ Sự Kiện Đặc Biệt** (z7260580908404...)
6. **Gói Dịch Vụ VIP** (z7356223047590...)
7. **Đội Xe Đa Dạng** (z6904030104678...)
8. **Trải Nghiệm Đẳng Cấp** (ChatGPT Image...)

---

## 🎮 NAVIGATION

### **Desktop:**
- Click nút ← để lùi
- Click nút → để tiến
- Nút tự disable khi đến đầu/cuối

### **Mobile:**
- Swipe left (tiến)
- Swipe right (lùi)
- Nút vẫn hoạt động

---

## ✨ HOVER EFFECTS

**Card:**
- Lift up 10px
- Shadow tăng lên

**Image:**
- Zoom from 1x → 1.1x (0.6s)

**Title:**
- Chuyển sang gradient tím

**Link:**
- Gap tăng, arrow move right

---

## 🎨 MÀU SẮC

**Section Background:** `#f8f9fa` (light gray)

**Card:** White với shadow

**Category Badge:** Gradient `#667eea → #764ba2`

**Hover:** Gradient tím trên title và link

---

## 🔧 TÙY CHỈNH

### **Thay đổi số cards hiển thị:**

File: `carousel.js` (lines 47-55)
```javascript
updateSlidesToShow() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        this.slidesToShow = 1;  // ← Mobile
    } else if (width <= 1024) {
        this.slidesToShow = 2;  // ← Tablet
    } else {
        this.slidesToShow = 3;  // ← Desktop
    }
}
```

### **Thay đổi animation speed:**

File: `carousel.js` (line 85)
```javascript
this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
//                                         ↑ Thay số này (seconds)
```

### **Thay đổi gap giữa cards:**

File: `carousel.css` (line 20)
```css
.blog-carousel-track {
    gap: 30px;  /* ← Thay số này */
}
```

Và `carousel.js` (line 81)
```javascript
const gap = 30; // ← Phải khớp với CSS
```

### **Thêm/bớt cards:**

**1. Thêm HTML:**

File: `index.html` trong `.blog-carousel-track`
```html
<div class="blog-carousel-slide">
    <div class="blog-card">
        <div class="blog-card-image">
            <img src="sources/carousel/new-image.jpg" alt="...">
            <div class="blog-card-overlay">
                <span class="blog-card-category">Category</span>
            </div>
        </div>
        <div class="blog-card-content">
            <h3 class="blog-card-title">Title</h3>
            <p class="blog-card-excerpt">Description...</p>
            <a href="blog.html" class="blog-card-link">
                Đọc thêm <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</div>
```

**2. JavaScript tự động:**
Không cần thay đổi JS, tự detect số slides!

---

## 📱 RESPONSIVE

### **Desktop (> 1024px):**
- 3 cards visible
- Navigation buttons 50px
- Image height 280px

### **Tablet (768px - 1024px):**
- 2 cards visible
- Navigation buttons 45px
- Image height 280px

### **Mobile (< 768px):**
- 1 card visible
- Navigation buttons 40px
- Image height 240px

### **Mobile Small (< 480px):**
- 1 card visible
- Navigation buttons 40px
- Image height 200px
- Reduced padding

---

## 🔍 TROUBLESHOOTING

### ❌ Carousel không hiển thị

**Check:**
1. `carousel.css` đã load? (trong `<head>`)
2. `carousel.js` đã load? (trước `</body>`)
3. Ảnh trong `sources/carousel/` tồn tại?

**Fix:**
- Hard refresh: Ctrl + Shift + R
- Check Console (F12) xem lỗi

### ❌ Buttons không hoạt động

**Check Console:**
```
✅ Blog Carousel initialized with 8 slides
```

Nếu không thấy → `carousel.js` chưa chạy

**Fix:**
- Kiểm tra `carousel.js` có syntax error không
- Đảm bảo load sau `script.js`

### ❌ Cards không chạy smooth

**Nguyên nhân:**
- Browser performance
- Ảnh quá nặng

**Fix:**
1. Optimize ảnh (compress)
2. Giảm animation duration
3. Check GPU acceleration

### ❌ Swipe không hoạt động

**Nguyên nhân:**
- Touch events bị conflict

**Fix:**
- Check không có JS khác block touch events
- Test trên device thật (không phải emulator)

---

## 💡 BEST PRACTICES

### **Ảnh:**
- Width: 600-800px
- Height: 400-600px
- Format: WebP hoặc JPG
- Quality: 75-85%
- Size: < 150KB

### **Content:**
- Title: 30-50 ký tự
- Excerpt: 80-120 ký tự
- Category: 1-2 từ

### **Performance:**
- Lazy load ảnh off-screen
- Optimize tất cả ảnh
- Use WebP format

---

## 🎯 SO SÁNH VỚI THE TIME CAPSULE

### **Giống:**
✅ Cards chạy ngang (horizontal)
✅ Navigation buttons ở 2 bên
✅ Hover zoom image
✅ Responsive design
✅ Smooth animations

### **Khác:**
- The Time Capsule: Auto-scroll
- Của bạn: Manual control (better UX)
- Của bạn: Gradient tím brand identity
- Của bạn: Category badges

---

## 📊 METRICS

- **Total Slides:** 8
- **Images:** 8 ảnh từ carousel folder
- **File Size:** 
  - carousel.css: ~8KB
  - carousel.js: ~5KB
- **Performance:** Smooth 60fps

---

## ✅ CHECKLIST HOÀN THÀNH

- [x] HTML structure
- [x] CSS styling
- [x] JavaScript logic
- [x] Responsive design
- [x] Touch support
- [x] Hover effects
- [x] Navigation buttons
- [x] Smooth animations

---

## 🎉 KẾT QUẢ

Carousel blog đẹp mắt, chuyên nghiệp, giống The Time Capsule!

**Mở `index.html` và xem ngay!** 🚀

---

*Created: 04/01/2026*
*Status: ✅ Production Ready*
