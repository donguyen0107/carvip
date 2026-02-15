@echo off
chcp 65001 >nul
color 0E
title 🚗 BOOKCARVIP - Mở Blog

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║            🚗  BOOKCARVIP - Blog  🚗              ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 🌐 Đang mở blog...
echo.

REM Check if server is running
curl -s http://localhost:3000 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 💡 Mở blog KHÔNG CẦN SERVER
    start "" "blog.html"
) else (
    echo 💡 Mở blog qua SERVER
    start "" "http://localhost:3000/blog.html"
)

echo.
echo ✅ Đã mở trình duyệt!
echo.
timeout /t 2 /nobreak >nul
