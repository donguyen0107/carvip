# Custom Prefix cho Vercel KV

## 🎯 Khuyến nghị: ĐỂ TRỐNG!

Khi tạo Vercel KV database, ở phần **Custom Prefix**:
- **Khuyến nghị:** Để trống (dùng prefix mặc định `KV_`)
- Code hiện tại đã tương thích với prefix mặc định

---

## ❓ Nếu muốn dùng Custom Prefix:

### Bước 1: Nhập prefix khi tạo database
Ví dụ: `CARVIP_KV`

### Bước 2: Sửa code API

Mở file `api/blog/posts.js` và `api/blog/posts/[id].js`, thay:

```javascript
// TRƯỚC (prefix mặc định)
import { kv } from '@vercel/kv';

// SAU (custom prefix)
import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.CARVIP_KV_REST_API_URL,
  token: process.env.CARVIP_KV_REST_API_TOKEN,
});
```

### Bước 3: Redeploy

```bash
git add .
git commit -m "Update KV client with custom prefix"
git push origin main
```

---

## ✅ Khuyến nghị cuối cùng:

**ĐỂ TRỐNG Custom Prefix!**

Lý do:
- ✅ Không cần sửa code
- ✅ Đơn giản hơn
- ✅ Tương thích với code hiện tại
- ✅ Dễ maintain

---

**TL;DR: Để trống, click Create là xong!**
