# 🎨 Hướng Dẫn Sử Dụng Admin CMS

## 📚 Mục Lục
1. [Giới Thiệu](#giới-thiệu)
2. [Cài Đặt](#cài-đặt)
3. [Khởi Động Server](#khởi-động-server)
4. [Sử Dụng Trang Admin](#sử-dụng-trang-admin)
5. [Chỉnh Sửa Nội Dung](#chỉnh-sửa-nội-dung)
6. [Quản Lý Ảnh](#quản-lý-ảnh)
7. [Bảo Mật](#bảo-mật)
8. [Khắc Phục Sự Cố](#khắc-phục-sự-cố)

---

## 🎯 Giới Thiệu

Hệ thống Admin CMS này giúp bạn dễ dàng chỉnh sửa nội dung website và quản lý ảnh **mà không cần kiến thức lập trình**.

### ✨ Tính năng:
- ✅ Chỉnh sửa nội dung HTML trực tiếp trên trình duyệt
- ✅ Preview (xem trước) thay đổi ngay lập tức
- ✅ Upload và quản lý ảnh
- ✅ Tự động backup file trước khi lưu
- ✅ Giao diện thân thiện, dễ sử dụng
- ✅ Bảo vệ bằng mật khẩu

---

## 🔧 Cài Đặt

### Bước 1: Cài Node.js

1. Tải Node.js từ: https://nodejs.org/ (Chọn phiên bản LTS)
2. Cài đặt Node.js (cứ Next > Next là được)
3. Kiểm tra đã cài thành công chưa:
   - Mở **Command Prompt** (Windows) hoặc **Terminal** (Mac/Linux)
   - Gõ lệnh: `node --version`
   - Nếu hiện số phiên bản (vd: v18.17.0) là OK ✅

### Bước 2: Cài Dependencies (Thư viện cần thiết)

1. Mở **Command Prompt** hoặc **Terminal**
2. Di chuyển đến thư mục website của bạn:
   ```bash
   cd đường/dẫn/đến/thư/mục/website
   ```
   Ví dụ: `cd C:\Users\YourName\Desktop\website`

3. Chạy lệnh cài đặt:
   ```bash
   npm install
   ```
   
4. Đợi khoảng 1-2 phút để cài đặt xong ✅

---

## 🚀 Khởi Động Server

### Cách 1: Chạy thủ công (Đơn giản nhất)

1. Mở **Command Prompt** tại thư mục website
2. Chạy lệnh:
   ```bash
   npm start
   ```
   hoặc
   ```bash
   node server.js
   ```

3. Bạn sẽ thấy thông báo:
   ```
   ╔════════════════════════════════════════════════╗
   ║   🚀 CMS SERVER ĐANG CHẠY!                    ║
   ║                                                ║
   ║   📍 Trang Admin: http://localhost:3000/admin.html  ║
   ║   🌐 Website: http://localhost:3000/              ║
   ║                                                ║
   ║   ⚠️  Mật khẩu mặc định: admin123             ║
   ╚════════════════════════════════════════════════╝
   ```

4. Mở trình duyệt và vào: **http://localhost:3000/admin.html**

### Cách 2: Chạy ở chế độ Dev (Tự động restart)

Nếu bạn muốn server tự động khởi động lại khi có thay đổi:
```bash
npm run dev
```

### ⚠️ Lưu ý quan trọng:
- **KHÔNG TẮT** cửa sổ Command Prompt khi đang sử dụng
- Server phải chạy thì website mới hoạt động
- Để dừng server: Nhấn `Ctrl + C` trong Command Prompt

---

## 🎨 Sử Dụng Trang Admin

### 1. Đăng Nhập

1. Mở trình duyệt, vào: `http://localhost:3000/admin.html`
2. Nhập mật khẩu (mặc định: **admin123**)
3. Click **Đăng Nhập**

> ⚠️ **QUAN TRỌNG**: Đổi mật khẩu ngay sau khi setup! (Xem phần [Bảo Mật](#bảo-mật))

### 2. Giao Diện Admin

Sau khi đăng nhập, bạn sẽ thấy:

```
┌─────────────────────────────────────────┐
│  🎨 Admin CMS          [Đăng Xuất]     │
├──────────┬──────────────────────────────┤
│ 📄 Files │  📝 Code Editor              │
│          │  👁️ Preview                  │
│ • index  │                              │
│ • booking│  [Nội dung HTML hiển thị]   │
│ • fleet  │                              │
│ • contact│  [💾 Lưu Thay Đổi]          │
│          │                              │
│ 🖼️ Ảnh   │                              │
└──────────┴──────────────────────────────┘
```

---

## ✏️ Chỉnh Sửa Nội Dung

### Bước 1: Chọn File

- Click vào tên file bên trái (vd: **index.html**, **booking.html**)
- File được chọn sẽ có màu tím

### Bước 2: Chỉnh Sửa

Có 2 tab để làm việc:

#### 📝 **Tab Code** (Chỉnh sửa HTML)
- Đây là nơi bạn sửa nội dung
- Tìm đoạn text cần sửa và thay đổi
- Ví dụ: Đổi `<h1>Welcome</h1>` thành `<h1>Chào mừng</h1>`

#### 👁️ **Tab Preview** (Xem trước)
- Xem website sẽ trông như thế nào sau khi sửa
- Click **🔄 Làm Mới Preview** để cập nhật

### Bước 3: Lưu Thay Đổi

1. Sau khi sửa xong, click **💾 Lưu Thay Đổi**
2. Thấy thông báo "✅ Lưu thành công!" là OK
3. Hệ thống tự động backup file cũ vào thư mục `backups/`

### 💡 Tips Chỉnh Sửa Nội Dung:

#### Thay đổi text thông thường:
```html
<!-- Tìm đoạn này -->
<h1>Luxury Car Rental</h1>
<!-- Đổi thành -->
<h1>Thuê Xe Sang Trọng</h1>
```

#### Thay đổi số điện thoại:
```html
<!-- Tìm -->
<a href="tel:+123456789">+123 456 789</a>
<!-- Đổi thành số của bạn -->
<a href="tel:+84901234567">+84 90 123 4567</a>
```

#### Thay đổi email:
```html
<!-- Tìm -->
<a href="mailto:info@example.com">info@example.com</a>
<!-- Đổi -->
<a href="mailto:yourmail@gmail.com">yourmail@gmail.com</a>
```

#### Thay đổi link ảnh:
```html
<!-- Tìm -->
<img src="old-image.jpg" alt="Car">
<!-- Đổi thành ảnh mới (sau khi upload) -->
<img src="new-image.jpg" alt="Car">
```

---

## 🖼️ Quản Lý Ảnh

### Upload Ảnh Mới

1. Click nút **🖼️ Quản Lý Ảnh** ở sidebar bên trái
2. Có 2 cách upload:
   - **Cách 1**: Click vào khung "📤 Kéo thả ảnh vào đây" và chọn file
   - **Cách 2**: Kéo file ảnh từ máy tính và thả vào khung

3. Đợi upload xong, bạn sẽ thấy thông báo "✅ Upload thành công!"

### Sử Dụng Ảnh Đã Upload

1. Trong phần "Thư viện ảnh", tìm ảnh vừa upload
2. Click **📋 Copy Path** để copy tên file
3. Quay lại tab Code Editor
4. Tìm thẻ `<img>` cần thay đổi
5. Paste tên file vào thuộc tính `src`:
   ```html
   <img src="ten-file-vua-copy.jpg" alt="Description">
   ```

### Định Dạng Ảnh Được Hỗ Trợ:
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ SVG
- ⚠️ Kích thước tối đa: **10MB**

### 💡 Tips Về Ảnh:

1. **Tối ưu ảnh trước khi upload**:
   - Dùng tool online như TinyPNG.com để giảm dung lượng
   - Ảnh nên < 500KB để website load nhanh

2. **Đặt tên file dễ nhớ**:
   - ✅ Tốt: `mercedes-s-class-2024.jpg`
   - ❌ Không tốt: `IMG_12345.jpg`

3. **Backup ảnh quan trọng** trước khi xóa

---

## 🔒 Bảo Mật

### ⚠️ QUAN TRỌNG: Đổi Mật Khẩu Mặc Định!

Mật khẩu mặc định `admin123` **RẤT KHÔNG AN TOÀN**. Hãy đổi ngay!

#### Cách đổi mật khẩu:

1. Mở file `server.js` bằng Notepad hoặc text editor
2. Tìm dòng:
   ```javascript
   const ADMIN_PASSWORD = 'admin123'; // ⚠️ ĐỔI MẬT KHẨU NÀY!
   ```
3. Đổi thành mật khẩu mạnh của bạn:
   ```javascript
   const ADMIN_PASSWORD = 'MatKhauManh@2024';
   ```
4. Lưu file
5. Khởi động lại server (Ctrl+C rồi `npm start`)

### Mật Khẩu Mạnh:
- ✅ Ít nhất 12 ký tự
- ✅ Có chữ hoa, chữ thường
- ✅ Có số và ký tự đặc biệt
- ❌ KHÔNG dùng: 123456, password, admin, tên của bạn

### Bảo Mật Khi Deploy:

Nếu bạn đưa website lên internet:
- 🔥 **BẮT BUỘC**: Dùng HTTPS
- 🔥 **BẮT BUỘC**: Đổi mật khẩu phức tạp
- 🔥 **BẮT BUỘC**: Giới hạn IP có thể truy cập admin
- 💡 **Khuyến nghị**: Dùng OAuth hoặc 2FA

---

## 🛠️ Khắc Phục Sự Cố

### ❌ Vấn đề 1: Không kết nối được server

**Triệu chứng**: Trang báo lỗi "Cannot connect" hoặc "This site can't be reached"

**Giải pháp**:
1. Kiểm tra server có đang chạy không? (Xem cửa sổ Command Prompt)
2. Đảm bảo đang truy cập đúng địa chỉ: `http://localhost:3000/admin.html`
3. Thử khởi động lại server: Ctrl+C rồi `npm start`
4. Kiểm tra port 3000 có bị chiếm không:
   ```bash
   netstat -ano | findstr :3000
   ```
   Nếu có, đổi port trong `server.js`:
   ```javascript
   const PORT = 3001; // Đổi sang port khác
   ```

### ❌ Vấn đề 2: Lỗi "npm not found"

**Triệu chứng**: Gõ `npm` báo lỗi không tìm thấy

**Giải pháp**:
1. Cài lại Node.js từ https://nodejs.org/
2. Restart máy tính
3. Mở Command Prompt mới và thử lại

### ❌ Vấn đề 3: Lỗi khi cài npm install

**Triệu chứng**: `npm install` báo lỗi

**Giải pháp**:
1. Xóa thư mục `node_modules` (nếu có)
2. Xóa file `package-lock.json` (nếu có)
3. Chạy lại:
   ```bash
   npm cache clean --force
   npm install
   ```

### ❌ Vấn đề 4: Không lưu được file

**Triệu chứng**: Click "Lưu" nhưng báo lỗi

**Giải pháp**:
1. Kiểm tra mật khẩu có đúng không
2. Đảm bảo file không bị khóa (đang mở ở chương trình khác)
3. Kiểm tra quyền ghi file (Run as Administrator)
4. Xem log lỗi trong Command Prompt

### ❌ Vấn đề 5: Upload ảnh thất bại

**Triệu chứng**: Upload ảnh báo lỗi

**Giải pháp**:
1. Kiểm tra kích thước file < 10MB
2. Đảm bảo là file ảnh (JPG, PNG, GIF, WebP)
3. Thử đổi tên file (không dấu, không khoảng trắng)
4. Kiểm tra dung lượng ổ đĩa còn trống

### ❌ Vấn đề 6: Preview không cập nhật

**Triệu chứng**: Sửa code nhưng Preview không thay đổi

**Giải pháp**:
1. Click nút **🔄 Làm Mới Preview**
2. Chuyển sang tab Code rồi quay lại tab Preview
3. Hard refresh trình duyệt: Ctrl + F5

---

## 📝 Backup & Restore

### Backup Tự Động

Mỗi khi bạn lưu file, hệ thống tự động tạo backup vào thư mục `backups/`:
```
backups/
  ├── index.html.backup-1735234567890
  ├── booking.html.backup-1735234568901
  └── ...
```

### Khôi Phục File Từ Backup

Nếu bạn sửa lỗi và muốn quay lại phiên bản cũ:

1. Vào thư mục `backups/`
2. Tìm file backup mới nhất (số timestamp lớn nhất)
3. Copy nội dung file backup
4. Paste vào Code Editor trong Admin
5. Click **💾 Lưu Thay Đổi**

### Backup Thủ Công (Khuyến nghị)

**Nên backup toàn bộ website mỗi tuần:**
1. Copy toàn bộ thư mục website
2. Đặt tên: `website-backup-2024-12-26`
3. Lưu vào nơi an toàn (Google Drive, USB, ...)

---

## 🌐 Deploy Lên Internet

Khi bạn sẵn sàng đưa website lên internet:

### Option 1: Dùng Hosting Có Node.js

**Các hosting phù hợp**:
- Heroku (Free tier)
- Railway.app (Free tier)
- Render.com (Free tier)
- DigitalOcean ($5/tháng)
- AWS / Google Cloud / Azure

**Bước deploy**:
1. Tạo tài khoản hosting
2. Upload code lên (thường dùng Git)
3. Set biến môi trường (PORT, PASSWORD)
4. Chạy `npm start`

### Option 2: Chỉ Deploy Static Files

Nếu không cần CMS nữa, chỉ cần website:
1. Upload các file `.html`, `.css`, `.js`, ảnh lên hosting tĩnh
2. Dùng Netlify / Vercel / GitHub Pages (FREE!)
3. Không cần Node.js, không cần server

⚠️ **Lưu ý**: Nếu deploy static, CMS sẽ không hoạt động nữa!

---

## 🆘 Hỗ Trợ

### Cần Giúp Đỡ?

1. **Đọc lại hướng dẫn này** - Hầu hết câu hỏi đã được giải đáp
2. **Kiểm tra phần Khắc Phục Sự Cố** ở trên
3. **Xem log lỗi** trong Command Prompt để biết chi tiết
4. **Google lỗi** - Copy thông báo lỗi và search

### Tài Nguyên Học Thêm

- **HTML cơ bản**: https://www.w3schools.com/html/
- **CSS cơ bản**: https://www.w3schools.com/css/
- **Node.js**: https://nodejs.org/en/docs/

---

## ✅ Checklist Khi Bắt Đầu

- [ ] Đã cài Node.js
- [ ] Đã chạy `npm install`
- [ ] Server chạy thành công
- [ ] Đăng nhập được vào Admin
- [ ] **ĐÃ ĐỔI MẬT KHẨU MẶC ĐỊNH** ⚠️
- [ ] Thử chỉnh sửa 1 file test
- [ ] Thử upload 1 ảnh test
- [ ] Đã backup toàn bộ website

---

## 🎉 Kết Luận

Chúc mừng! Bạn đã có một hệ thống CMS đơn giản để quản lý website. 

**Nhớ**:
- ✅ Backup thường xuyên
- ✅ Đổi mật khẩu mạnh
- ✅ Test kỹ trước khi deploy
- ✅ Giữ server chạy khi đang sử dụng

**Happy editing! 🚀**
