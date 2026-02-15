@echo off
chcp 65001 >nul
color 0C
title 🚗 BOOKCARVIP - Dừng Server

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║                                                    ║
echo ║         🚗  BOOKCARVIP - Stop Server  🚗          ║
echo ║                                                    ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 🛑 Đang dừng server...
echo.

REM Kill all node processes running server.js
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *Blog Server*" >nul 2>nul

REM Also try to kill by port
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>nul
)

echo ✅ Server đã dừng!
echo.
timeout /t 2 /nobreak >nul
