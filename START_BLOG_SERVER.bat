@echo off
chcp 65001 >nul
color 0A
title 🚗 BOOKCARVIP Blog Server

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║        🚗  BOOKCARVIP - Blog Server  🚗           ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 📌 Đang khởi động server...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo ❌ LỖI: Không tìm thấy Node.js!
    echo.
    echo 📥 Bạn cần cài đặt Node.js trước:
    echo    👉 Tải tại: https://nodejs.org/
    echo.
    echo 💡 Sau khi cài xong, chạy lại file này.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Đang cài đặt dependencies lần đầu...
    echo    ⏳ Quá trình này có thể mất vài phút...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        color 0C
        echo.
        echo ❌ Lỗi khi cài đặt! Vui lòng kiểm tra kết nối internet.
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ✅ Khởi động server thành công!
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║              SERVER ĐANG CHẠY                      ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 🌐 Truy cập website tại:
echo    👉 http://localhost:3000
echo.
echo 📝 Trang quản lý bài viết:
echo    👉 http://localhost:3000/admin-login.html
echo    👉 http://localhost:3000/blog-editor.html
echo.
echo 👀 Xem blog:
echo    👉 http://localhost:3000/blog.html
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  🔐 Thông tin đăng nhập:                          ║
echo ║     Username: admin                                ║
echo ║     Password: admin123                             ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 💡 Mẹo:
echo    - Ctrl + Click vào link để mở trình duyệt
echo    - Đóng cửa sổ này để DỪNG server
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Start the server
node server.js

REM If server stops
echo.
echo ⚠️  Server đã dừng!
echo.
pause
