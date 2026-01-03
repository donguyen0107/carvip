# 🎨 Admin CMS - Quick Start

## 🚀 Khởi động nhanh (3 bước đơn giản)

### Bước 1: Cài đặt Node.js
Tải và cài từ: https://nodejs.org/ (Chọn LTS)

### Bước 2: Cài dependencies
Mở Command Prompt tại thư mục này và chạy:
```bash
npm install
```

### Bước 3: Khởi động server
**Windows**: Double-click file `START_SERVER.bat`

**Hoặc chạy lệnh**:
```bash
npm start
```

### 🎯 Truy cập Admin Panel
Mở trình duyệt và vào: **http://localhost:3000/admin.html**

**Mật khẩu mặc định**: `admin123` ⚠️ (Đổi ngay trong file server.js!)

---

## 📖 Hướng dẫn chi tiết

Xem file **ADMIN_GUIDE.md** để biết:
- Cách chỉnh sửa nội dung
- Cách upload và quản lý ảnh  
- Cách đổi mật khẩu
- Khắc phục sự cố
- Deploy lên internet

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **ĐỔI MẬT KHẨU** ngay sau khi cài đặt!
   - Mở file `server.js`
   - Tìm dòng: `const ADMIN_PASSWORD = 'admin123';`
   - Đổi thành mật khẩu mạnh

2. **GIỮ SERVER CHẠY** khi đang sử dụng Admin Panel

3. **BACKUP THƯỜNG XUYÊN** - Hệ thống tự động backup vào thư mục `backups/`

---

## 📁 Cấu trúc File

```
├── server.js           # Server Node.js (Backend)
├── admin.html          # Trang Admin Panel
├── package.json        # Cấu hình Node.js
├── ADMIN_GUIDE.md      # Hướng dẫn đầy đủ
├── START_SERVER.bat    # Khởi động nhanh (Windows)
├── backups/            # Backup tự động
└── [Các file website khác...]
```

---

## 🆘 Gặp vấn đề?

Xem phần **Khắc Phục Sự Cố** trong ADMIN_GUIDE.md

---

**Happy Managing! 🎉**
