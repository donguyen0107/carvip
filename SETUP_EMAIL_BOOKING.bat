@echo off
chcp 65001 >nul
color 0B

echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                 📧 SETUP EMAIL NHẬN ĐƠN ĐẶT XE                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo 🎯 File này sẽ giúp bạn:
echo    1. Mở hướng dẫn setup chi tiết
echo    2. Mở file cấu hình để chỉnh sửa
echo    3. Mở trang booking để test
echo.
echo ════════════════════════════════════════════════════════════════════
echo.

:MENU
echo.
echo Chọn thao tác:
echo.
echo [1] Mở hướng dẫn setup EMAIL (khuyến nghị đọc đầu tiên)
echo [2] Mở file cấu hình emailjs-config.js để chỉnh sửa
echo [3] Mở trang booking.html để test
echo [4] Mở tất cả (hướng dẫn + file config + booking)
echo [5] Thoát
echo.
set /p choice="Nhập số (1-5): "

if "%choice%"=="1" goto GUIDE
if "%choice%"=="2" goto CONFIG
if "%choice%"=="3" goto BOOKING
if "%choice%"=="4" goto ALL
if "%choice%"=="5" goto EXIT
echo ❌ Lựa chọn không hợp lệ!
goto MENU

:GUIDE
echo.
echo 📖 Đang mở hướng dẫn setup...
start HUONG_DAN_SETUP_EMAIL_BOOKING.md
echo ✅ Đã mở!
goto MENU

:CONFIG
echo.
echo ⚙️ Đang mở file cấu hình...
start notepad emailjs-config.js
echo ✅ Đã mở! Hãy cập nhật các thông tin:
echo    - publicKey
echo    - serviceId  
echo    - templateId
echo    - adminEmail (email của bạn)
goto MENU

:BOOKING
echo.
echo 🚗 Đang mở trang booking để test...
start booking.html
echo ✅ Đã mở! Sau khi setup xong, hãy test đặt xe.
goto MENU

:ALL
echo.
echo 📚 Đang mở tất cả...
start HUONG_DAN_SETUP_EMAIL_BOOKING.md
timeout /t 1 >nul
start notepad emailjs-config.js
timeout /t 1 >nul
start booking.html
echo ✅ Đã mở tất cả!
echo.
echo 💡 Gợi ý:
echo    1. Đọc hướng dẫn trong file .md
echo    2. Cập nhật thông tin trong emailjs-config.js
echo    3. Test trên booking.html
goto MENU

:EXIT
echo.
echo 👋 Cảm ơn bạn đã sử dụng! Chúc setup thành công!
echo.
pause
exit

