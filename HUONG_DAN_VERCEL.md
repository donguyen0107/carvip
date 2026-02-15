# 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL

## ✅ ƯU ĐIỂM VERCEL

- ✅ **Nhanh hơn GitHub Pages** (30 giây thay vì 2-3 phút)
- ✅ **CDN toàn cầu** (Edge Network)
- ✅ **Viết bài không cần GitHub API** - Dùng Vercel KV (Redis)
- ✅ **Không cần token** - API tự động bảo mật
- ✅ **SSL miễn phí** - HTTPS tự động
- ✅ **Preview mỗi commit** - Xem trước trước khi deploy
- ✅ **Miễn phí 100%** - Hobby plan

---

## 📋 BƯỚC 1: TẠO TÀI KHOẢN VERCEL

1. Vào: https://vercel.com/signup
2. Chọn: **Continue with GitHub**
3. Đăng nhập GitHub và cho phép Vercel

---

## 📋 BƯỚC 2: TẠO VERCEL KV DATABASE

### 2.1. Vào Dashboard
https://vercel.com/dashboard

### 2.2. Tạo KV Store
1. Click **Storage** (menu trái)
2. Click **Create Database**
3. Chọn: **KV** (Redis)
4. Điền:
   - **Name:** `blog-posts`
   - **Region:** Singapore (gần VN nhất)
5. Click **Create**

### 2.3. Lưu thông tin
Sau khi tạo, bạn sẽ thấy:
```
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```
→ **KHÔNG CẦN LƯU** (Vercel tự động dùng)

---

## 📋 BƯỚC 3: DEPLOY DỰ ÁN

### Cách 1: Deploy từ GitHub (KHUYẾN NGHỊ) ⭐

#### 3.1. Push code lên GitHub
```bash
git add .
git commit -m "Add Vercel support with KV storage"
git push origin main
```

#### 3.2. Import vào Vercel
1. Vào: https://vercel.com/new
2. Click **Import Git Repository**
3. Chọn repository: `donguyen0107/carvip`
4. Click **Import**

#### 3.3. Cấu hình
- **Framework Preset:** Other (hoặc để trống)
- **Root Directory:** `./`
- **Build Command:** Để trống
- **Output Directory:** Để trống
- **Install Command:** `npm install`

#### 3.4. Environment Variables
Click **Add** và thêm:

```
KV_REST_API_URL = (copy từ KV database)
KV_REST_API_TOKEN = (copy từ KV database)
```

Hoặc click **Connect Store** → Chọn `blog-posts` KV

#### 3.5. Deploy
Click **Deploy** và đợi 1-2 phút

---

### Cách 2: Deploy bằng Vercel CLI

#### 3.1. Cài Vercel CLI
```bash
npm install -g vercel
```

#### 3.2. Login
```bash
vercel login
```

#### 3.3. Link KV Database
```bash
vercel link
vercel env pull
```

#### 3.4. Deploy
```bash
# Test local
vercel dev

# Deploy production
vercel --prod
```

---

## 📋 BƯỚC 4: KẾT NỐI KV DATABASE

### 4.1. Vào Project Settings
https://vercel.com/donguyen0107/carvip/settings

### 4.2. Vào Storage
Click tab **Storage** → Click **Connect Store**

### 4.3. Chọn KV
Chọn `blog-posts` → Click **Connect**

✅ Xong! Vercel tự động inject environment variables.

---

## 📋 BƯỚC 5: TEST

### 5.1. Lấy URL
Sau khi deploy, bạn sẽ có URL:
```
https://carvip.vercel.app
```
(hoặc tên khác tùy Vercel generate)

### 5.2. Test Admin
```
https://carvip.vercel.app/admin-instant.html
```

Đăng nhập và thử viết bài:
- Username: `admin`
- Password: `admin123`

### 5.3. Viết bài test
1. Viết bài mới
2. Click **"Xuất bản"**
3. **KHÔNG CẦN NHẬP TOKEN!** ✅
4. Bài viết lưu ngay vào Vercel KV

### 5.4. Kiểm tra blog
```
https://carvip.vercel.app/blog.html
```

→ Bài viết sẽ hiện **NGAY LẬP TỨC!** (không cần đợi 2-3 phút)

---

## 🎯 WORKFLOW MỚI

```
┌─────────────────────────────────────────┐
│  1. Viết bài trên admin                 │
│     https://carvip.vercel.app/admin-... │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. Click "Xuất bản"                    │
│     KHÔNG cần token!                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. API /api/posts nhận request         │
│     Lưu vào Vercel KV (Redis)           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. Blog cập nhật NGAY LẬP TỨC! ✅       │
│     (không cần đợi deploy)              │
└─────────────────────────────────────────┘
```

---

## ⚡ SO SÁNH TỐC ĐỘ

| | GitHub Pages | Vercel |
|---|--------------|--------|
| **Deploy time** | 2-3 phút | 30 giây |
| **CDN cache** | 5 phút | Instant |
| **Viết bài → Hiển thị** | 5-8 phút | **5 giây** ✅ |
| **Cần token** | ✅ Cần | ❌ Không cần |
| **Database** | Không | ✅ Vercel KV |

---

## 🔄 TỰ ĐỘNG DEPLOY

Sau khi setup xong:

**Khi bạn push code lên GitHub:**
```bash
git push origin main
```

→ Vercel **TỰ ĐỘNG DEPLOY** trong 30 giây!

**Khi bạn viết bài trên web:**
- Bài viết lưu vào Vercel KV
- Hiển thị **NGAY LẬP TỨC**
- Không cần deploy lại!

---

## 🌐 DOMAIN TÙY CHỈNH (TÙY CHỌN)

### Nếu bạn có domain riêng:

1. Vào: https://vercel.com/donguyen0107/carvip/settings/domains
2. Nhập domain của bạn (vd: `carvip.vn`)
3. Cập nhật DNS theo hướng dẫn
4. Đợi vài phút
5. ✅ Domain của bạn trỏ đến Vercel!

### Nếu không có domain:
- Dùng domain miễn phí của Vercel: `carvip.vercel.app`
- Hoặc đổi tên: Settings → Domain → Add

---

## 📊 MONITOR & ANALYTICS

### Xem thống kê:
https://vercel.com/donguyen0107/carvip/analytics

- Số lượt truy cập
- Tốc độ load
- Lỗi (nếu có)

### Xem logs:
https://vercel.com/donguyen0107/carvip/logs

- Request logs
- Function logs
- Error logs

---

## 🔧 DEBUG

### Test API local:
```bash
vercel dev
```

Mở: http://localhost:3000

### Test API endpoint:
```bash
curl https://carvip.vercel.app/api/posts
```

### Xem KV data:
1. Vào: https://vercel.com/dashboard/stores
2. Click vào `blog-posts`
3. Tab **Data**
4. Xem key `blog_posts`

---

## ❓ TROUBLESHOOTING

### Lỗi: "KV not found"
**Nguyên nhân:** Chưa connect KV database

**Giải pháp:**
1. Vào Project Settings → Storage
2. Click **Connect Store**
3. Chọn `blog-posts`

### Lỗi: "Module not found @vercel/kv"
**Nguyên nhân:** Package chưa được cài

**Giải pháp:**
```bash
npm install @vercel/kv
git add package.json package-lock.json
git commit -m "Add @vercel/kv"
git push
```

### Bài viết không hiện
**Nguyên nhân:** Cache

**Giải pháp:**
- Hard refresh: `Ctrl + Shift + R`
- Hoặc xóa cache trong Vercel dashboard

---

## 🎉 HOÀN TẤT!

Bây giờ bạn có:
- ✅ Blog trên Vercel (cực nhanh!)
- ✅ Viết bài không cần token
- ✅ Database miễn phí (Vercel KV)
- ✅ Deploy tự động từ GitHub
- ✅ SSL miễn phí
- ✅ CDN toàn cầu

**URL admin:**
```
https://carvip.vercel.app/admin-instant.html
```

**URL blog:**
```
https://carvip.vercel.app/blog.html
```

---

**Chúc bạn thành công! 🚀**
