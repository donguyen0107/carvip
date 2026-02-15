# Kiểm Tra Lỗi Vercel Deployment

## Bước 1: Xem Deployment Logs

1. Vào: https://vercel.com/dashboard
2. Tab **Deployments**
3. Click vào deployment **MÀU ĐỎ** (Failed)
4. Xem các tabs:
   - **Building** - Lỗi khi build
   - **Functions** - Lỗi khi deploy API
   - **Logs** - Log chi tiết

## Bước 2: Tìm Error Message

Tìm dòng có chữ **ERROR** (màu đỏ) hoặc **failed**

Ví dụ các lỗi phổ biến:

### Lỗi 1: Package installation failed
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
```
**Fix:** Sửa package.json

### Lỗi 2: Syntax error
```
SyntaxError: Unexpected token
```
**Fix:** Sửa code có lỗi syntax

### Lỗi 3: Module not found
```
Error: Cannot find module '@vercel/kv'
```
**Fix:** Thêm package vào dependencies

### Lỗi 4: Build command failed
```
Error: Command "npm run build" exited with 1
```
**Fix:** Kiểm tra build script

## Bước 3: Gửi Error Message

Copy **TOÀN BỘ** error message và gửi cho tôi, bao gồm:
- Dòng ERROR chính
- 5-10 dòng phía trên
- 5-10 dòng phía dưới

## Bước 4: Hoặc chụp màn hình

Chụp màn hình phần logs có lỗi và gửi cho tôi!

---

## Common Issues

### Issue: "Module not found"
```bash
# Local test
npm install
npm run build
```

### Issue: "Invalid vercel.json"
Check vercel.json syntax

### Issue: "Function timeout"
Check API code for infinite loops

---

**After finding the error, send me the error message so I can help fix it!**
