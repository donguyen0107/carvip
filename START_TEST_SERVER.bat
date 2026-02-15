@echo off
chcp 65001 >nul
color 0B

echo ╔══════════════════════════════════════════════════════════════════╗
echo ║              🚀 KHỞI ĐỘNG SERVER TEST EMAIL                      ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo 📌 Server sẽ chạy tại: http://localhost:8000
echo.
echo ⚠️  QUAN TRỌNG:
echo    - KHÔNG đóng cửa sổ này khi đang test
echo    - Nhấn Ctrl+C để dừng server
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
echo 🔄 Đang khởi động server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python chưa được cài đặt!
    echo.
    echo 📥 Vui lòng cài Python từ: https://www.python.org/downloads/
    echo    Hoặc dùng Node.js với lệnh: npx http-server
    echo.
    pause
    exit
)

echo ✅ Python detected
echo.
echo 🌐 Mở trình duyệt và truy cập:
echo    → http://localhost:8000/TEST_EMAIL_BOOKING.html
echo    → http://localhost:8000/booking.html
echo.
echo ════════════════════════════════════════════════════════════════════
echo.

REM Start Python HTTP Server
python -m http.server 8000

pause
