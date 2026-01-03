╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║            🚗  BOOKCARVIP - Hướng Dẫn Sử Dụng  🚗             ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

📋 CÁC FILE BAT VÀ CÔNG DỤNG:

┌─────────────────────────────────────────────────────────────┐
│ 1. START_BLOG_SERVER.bat                                    │
│    ✨ Khởi động server blog                                 │
│    📍 Chạy file này NẾU bạn muốn dùng server                │
│    💡 Server sẽ chạy tại: http://localhost:3000              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. OPEN_BLOG_ADMIN.bat                                      │
│    ✨ Mở trang quản lý admin                                │
│    💡 Tự động chọn có server hoặc không có server            │
│    👉 KHUYẾN NGHỊ: Chạy file này để vào trang admin         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. OPEN_BLOG_WEBSITE.bat                                    │
│    ✨ Mở trang blog để xem bài viết                         │
│    💡 Hoạt động cả khi có và không có server                 │
│    👉 Dùng để xem blog như người dùng                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. STOP_BLOG_SERVER.bat                                     │
│    ✨ Dừng server đang chạy                                 │
│    💡 Chạy khi muốn tắt server                               │
└─────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 HƯỚNG DẪN CHO NGƯỜI MỚI (KHÔNG CẦN SERVER):

   ┌─────────────────────────────────────────────────────────┐
   │ Bước 1: Chạy file "OPEN_BLOG_ADMIN.bat"                │
   │ Bước 2: Chọn [1] - Không cần server                    │
   │ Bước 3: Đăng nhập và viết bài                          │
   │ Bước 4: Chạy "OPEN_BLOG_WEBSITE.bat" để xem blog      │
   └─────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 HƯỚNG DẪN CHO NGƯỜI ADVANCED (CÓ SERVER):

   ┌─────────────────────────────────────────────────────────┐
   │ Bước 1: Chạy file "START_BLOG_SERVER.bat"              │
   │ Bước 2: Đợi server khởi động (cửa sổ đen)             │
   │ Bước 3: Chạy "OPEN_BLOG_ADMIN.bat"                     │
   │ Bước 4: Đăng nhập và viết bài                          │
   │ Bước 5: Chạy "OPEN_BLOG_WEBSITE.bat" để xem blog      │
   │ Bước 6: Chạy "STOP_BLOG_SERVER.bat" khi xong           │
   └─────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 THÔNG TIN ĐĂNG NHẬP:

   Username: admin
   Password: admin123
   
   💡 Đổi mật khẩu trong file server.js (dòng 20)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ CÂU HỎI THƯỜNG GẶP:

Q: Nên dùng có server hay không có server?
A: 👉 KHÔNG CẦN SERVER - Đơn giản nhất cho người mới!
   Chỉ cần double-click file .bat là dùng được.

Q: Khi nào cần dùng server?
A: Khi bạn muốn:
   - Deploy lên hosting/VPS
   - Nhiều người cùng quản lý
   - Cần API để tích hợp

Q: Làm sao biết server đang chạy?
A: Có cửa sổ CMD đen hiện "SERVER ĐANG CHẠY"

Q: Làm sao tắt server?
A: - Cách 1: Đóng cửa sổ CMD đen
   - Cách 2: Chạy file "STOP_BLOG_SERVER.bat"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 MẸO HAY:

✅ Tạo Shortcut trên Desktop:
   - Click phải vào file .bat
   - Chọn "Send to" → "Desktop (create shortcut)"
   - Đổi tên và đổi icon cho đẹp!

✅ Pin vào Taskbar:
   - Tạo shortcut file .bat
   - Click phải shortcut → Pin to taskbar

✅ Backup dữ liệu:
   - Copy file "blog-posts.json" để backup bài viết

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 HỖ TRỢ:

Nếu gặp lỗi, hãy:
1. Đọc thông báo lỗi trong cửa sổ CMD
2. Kiểm tra đã cài Node.js chưa
3. Thử chạy lại file .bat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Chúc bạn sử dụng vui vẻ!

