╔══════════════════════════════════════════════════════════════════╗
║          📧 HỆ THỐNG EMAIL TỰ ĐỘNG CHO ĐẶT XE MERCEDES          ║
╚══════════════════════════════════════════════════════════════════╝

✅ ĐÃ CÀI ĐẶT THÀNH CÔNG!

Hệ thống đã sẵn sàng để gửi email tự động khi khách hàng đặt xe.
Bạn chỉ cần thực hiện 5 bước đơn giản để kích hoạt.

═══════════════════════════════════════════════════════════════════

🚀 CÁCH BẮT ĐẦU (CHỌN 1 TRONG 2)

CÁCH 1: SỬ DỤNG FILE BAT (KHUYẾN NGHỊ - DỄ NHẤT)
   → Double click file: SETUP_EMAIL_BOOKING.bat
   → Chọn option [4] để mở tất cả
   → Làm theo hướng dẫn trong file mở ra

CÁCH 2: SETUP THỦ CÔNG
   1. Đọc file: HUONG_DAN_SETUP_EMAIL_BOOKING.md
   2. Chỉnh sửa file: emailjs-config.js
   3. Test bằng file: TEST_EMAIL_BOOKING.html

═══════════════════════════════════════════════════════════════════

📁 CÁC FILE LIÊN QUAN

[📖 HƯỚNG DẪN]
✓ HUONG_DAN_SETUP_EMAIL_BOOKING.md  - Hướng dẫn chi tiết từng bước
✓ README_EMAIL_BOOKING.txt          - File này (hướng dẫn tóm tắt)

[⚙️ CẤU HÌNH]
✓ emailjs-config.js                 - File cấu hình (CẦN CHỈNH SỬA)

[🧪 TEST]
✓ TEST_EMAIL_BOOKING.html           - Test email trước khi đưa vào sử dụng
✓ SETUP_EMAIL_BOOKING.bat           - Tool hỗ trợ setup nhanh

[🚗 WEBSITE]
✓ booking.html                      - Form đặt xe (đã tích hợp email)
✓ booking-script.js                 - Logic xử lý đặt xe

═══════════════════════════════════════════════════════════════════

⚡ SETUP NHANH 5 PHÚT

1️⃣ ĐĂNG KÝ EMAILJS
   → Truy cập: https://www.emailjs.com/
   → Sign up miễn phí (200 emails/tháng)
   → Xác nhận email

2️⃣ TẠO SERVICE
   → Dashboard → Email Services → Add New Service
   → Chọn Gmail → Kết nối tài khoản
   → Copy Service ID (vd: service_abc1234)

3️⃣ TẠO TEMPLATE
   → Dashboard → Email Templates → Create New Template
   → Copy template từ file HUONG_DAN_SETUP_EMAIL_BOOKING.md
   → Save và copy Template ID (vd: template_xyz5678)

4️⃣ LẤY PUBLIC KEY
   → Dashboard → Account → Copy Public Key

5️⃣ CẬP NHẬT CODE
   → Mở file: emailjs-config.js
   → Thay 4 giá trị:
      • publicKey: '[Public Key của bạn]'
      • serviceId: '[Service ID của bạn]'
      • templateId: '[Template ID của bạn]'
      • adminEmail: '[Email nhận thông báo của bạn]'

═══════════════════════════════════════════════════════════════════

🧪 CÁCH TEST

CÁCH 1: Sử dụng trang test chuyên dụng
   → Mở file: TEST_EMAIL_BOOKING.html
   → Click "Gửi Email Test"
   → Kiểm tra email của bạn

CÁCH 2: Test trực tiếp trên website
   → Mở file: booking.html
   → Điền form đặt xe
   → Submit và kiểm tra email

═══════════════════════════════════════════════════════════════════

📧 BẠN SẼ NHẬN ĐƯỢC GÌ?

Mỗi khi khách hàng đặt xe, bạn sẽ nhận email với:

✓ Thông tin khách hàng (tên, email, SĐT, CMND)
✓ Thông tin xe (loại xe, thời gian thuê)
✓ Ngày nhận/trả xe
✓ Địa điểm nhận/trả
✓ Dịch vụ bổ sung
✓ Yêu cầu đặc biệt
✓ Mã booking để tracking

═══════════════════════════════════════════════════════════════════

❓ XỬ LÝ LỖI THƯỜNG GẶP

❌ Không nhận được email?
   → Kiểm tra spam/junk folder
   → Đảm bảo đã thay đổi hết YOUR_... trong emailjs-config.js
   → Mở Console (F12) xem log lỗi
   → Check EmailJS Dashboard → Logs

❌ Lỗi "EmailJS is not defined"?
   → Đảm bảo có kết nối internet
   → EmailJS SDK tự động load từ CDN

❌ Vượt quá 200 emails/tháng?
   → Upgrade plan trên EmailJS
   → Hoặc tạo tài khoản mới

═══════════════════════════════════════════════════════════════════

💰 CHI PHÍ

✓ MIỄN PHÍ: 200 emails/tháng (đủ cho startup)
✓ Basic: $7/tháng (1,000 emails)
✓ Pro: $15/tháng (5,000 emails)

Không cần credit card cho gói miễn phí!

═══════════════════════════════════════════════════════════════════

🎯 CHECKLIST HOÀN THÀNH

Đánh dấu khi hoàn thành từng bước:

[ ] Đã đăng ký EmailJS
[ ] Đã tạo Email Service và có Service ID
[ ] Đã tạo Email Template và có Template ID  
[ ] Đã có Public Key
[ ] Đã cập nhật emailjs-config.js với 4 thông tin
[ ] Đã test bằng TEST_EMAIL_BOOKING.html
[ ] Đã nhận được email test thành công
[ ] Đã test trên booking.html
[ ] Đã nhận được email booking thành công

═══════════════════════════════════════════════════════════════════

🎉 HOÀN TẤT!

Sau khi hoàn thành checklist, hệ thống sẽ tự động gửi email 
mỗi khi có đơn đặt xe mới. Bạn sẽ nhận thông báo ngay lập tức 
và có thể liên hệ khách hàng kịp thời.

═══════════════════════════════════════════════════════════════════

📞 HỖ TRỢ

• EmailJS Docs: https://www.emailjs.com/docs/
• EmailJS Support: support@emailjs.com
• YouTube Tutorial: Search "EmailJS tutorial"

═══════════════════════════════════════════════════════════════════

Chúc bạn setup thành công! 🚀
