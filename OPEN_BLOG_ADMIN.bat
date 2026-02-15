@echo off
chcp 65001 >nul
color 0B
title 🚗 BOOKCARVIP - Mở Trang Admin

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║         🚗  BOOKCARVIP - Admin Panel  🚗          ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 🔍 Đang kiểm tra server...
echo.

REM Check if server is running
curl -s http://localhost:3000 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Server chưa chạy!
    echo.
    echo 💡 Bạn có 2 lựa chọn:
    echo.
    echo    [1] Sử dụng KHÔNG CẦN SERVER (Khuyến nghị cho người mới)
    echo        → Mở admin-instant.html
    echo.
    echo    [2] Sử dụng CÓ SERVER (Advanced)
    echo        → Cần chạy START_BLOG_SERVER.bat trước
    echo.
    choice /C 12 /N /M "Chọn (1 hoặc 2): "
    
    if errorlevel 2 (
        echo.
        echo 🚀 Đang khởi động server...
        start "" "START_BLOG_SERVER.bat"
        timeout /t 5 /nobreak >nul
        echo 🌐 Đang mở trang admin với server...
        start "" "http://localhost:3000/admin-login.html"
    ) else (
        echo.
        echo 🌐 Đang mở trang admin OFFLINE...
        start "" "admin-instant.html"
    )
) else (
    echo ✅ Server đang chạy!
    echo.
    echo 🌐 Đang mở trang admin...
    start "" "http://localhost:3000/admin-login.html"
)

echo.
echo ✅ Đã mở trình duyệt!
echo.
timeout /t 2 /nobreak >nul
