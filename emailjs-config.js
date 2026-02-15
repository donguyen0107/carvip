// ===== EMAILJS CONFIGURATION =====
// Hướng dẫn setup EmailJS:
// 1. Đăng ký tài khoản tại https://www.emailjs.com/
// 2. Tạo email service (Gmail, Outlook, etc.)
// 3. Tạo email template
// 4. Lấy các keys và điền vào đây

const EMAILJS_CONFIG = {
    // Thay YOUR_PUBLIC_KEY bằng Public Key từ EmailJS Dashboard
    publicKey: 'Gfej9tcaaQEDJ0ASz',
    
    // Thay YOUR_SERVICE_ID bằng Service ID từ EmailJS Dashboard  
    serviceId: 'service_c1fcyxa',
    
    // Thay YOUR_TEMPLATE_ID bằng Template ID từ EmailJS Dashboard
    // ⚠️ LƯU Ý: Template ID phải tồn tại trong EmailJS Dashboard
    // Vào https://dashboard.emailjs.com/admin/templates để kiểm tra
    templateId: 'template_p1atqb7',  // ← THAY ĐỔI Template ID MỚI TẠI ĐÂY
    
    // Email admin nhận thông báo
    adminEmail: 'donguyen072010@gmail.com'
};

// Load EmailJS SDK
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('✅ EmailJS initialized');
        }
    };
    document.head.appendChild(script);
})();

// Send booking notification email
async function sendBookingEmail(bookingData) {
    try {
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
            console.warn('⚠️ EmailJS chưa được cấu hình. Vui lòng cập nhật emailjs-config.js');
            console.log('📧 Thông tin booking sẽ được hiển thị trong console:');
            console.table(bookingData);
            return { success: true, message: 'Booking đã được lưu (EmailJS chưa cấu hình)' };
        }
        
        // Check if emailjs is loaded
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS SDK chưa được load. Vui lòng chạy qua HTTP server.');
            return { 
                success: false, 
                message: 'Lỗi: Vui lòng chạy website qua HTTP server (không mở trực tiếp file HTML)' 
            };
        }

        // Prepare email template parameters
        const templateParams = {
            to_email: EMAILJS_CONFIG.adminEmail,
            from_name: bookingData.fullName,
            from_email: bookingData.email,
            phone: bookingData.phone,
            car_type: getCarName(bookingData.carType),
            rental_type: getRentalTypeName(bookingData.rentalType),
            duration: bookingData.duration,
            pickup_date: formatDateTime(bookingData.pickupDate),
            return_date: formatDateTime(bookingData.returnDate),
            pickup_location: bookingData.pickupLocation,
            return_location: bookingData.returnLocation || bookingData.pickupLocation,
            driver: bookingData.driver === 'with-driver' ? 'Có tài xế' : 'Tự lái',
            services: bookingData.services.length > 0 ? bookingData.services.join(', ') : 'Không có',
            special_requests: bookingData.specialRequests || 'Không có',
            id_number: bookingData.idNumber,
            booking_date: new Date().toLocaleString('vi-VN'),
            booking_id: `MB${Date.now()}`
        };
        
        console.log('📧 Sending email with params:', templateParams);
        console.log('📧 Using Service ID:', EMAILJS_CONFIG.serviceId);
        console.log('📧 Using Template ID:', EMAILJS_CONFIG.templateId);
        console.log('📧 Using Public Key:', EMAILJS_CONFIG.publicKey);
        
        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        console.log('✅ Email sent successfully:', response);
        return { success: true, message: 'Email đã được gửi thành công!' };
        
    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.error('❌ Error details:', error.text || error.message);
        console.error('❌ Error status:', error.status);
        
        // Still save booking data even if email fails
        console.log('📧 Thông tin booking (email failed):');
        console.table(bookingData);
        
        return { 
            success: false, 
            message: 'Đặt xe thành công nhưng gửi email thất bại. Chúng tôi sẽ liên hệ lại với bạn.' 
        };
    }
}

// Helper functions
function getCarName(carType) {
    const carNames = {
        's-class': 'Mercedes S-Class',
        'e-class': 'Mercedes E-Class',
        'c-class': 'Mercedes C-Class',
        'gls': 'Mercedes GLS',
        'gle': 'Mercedes GLE',
        'glc': 'Mercedes GLC'
    };
    return carNames[carType] || carType;
}

function getRentalTypeName(rentalType) {
    const types = {
        'hourly': 'Theo giờ',
        'daily': 'Theo ngày',
        'monthly': 'Theo tháng'
    };
    return types[rentalType] || rentalType;
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===== HƯỚNG DẪN CẤU HÌNH EMAILJS =====
/*

BƯỚC 1: ĐĂNG KÝ EMAILJS
1. Truy cập: https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (200 emails/tháng)
3. Xác nhận email

BƯỚC 2: TẠO EMAIL SERVICE
1. Vào Dashboard > Email Services
2. Click "Add New Service"
3. Chọn email provider (Gmail khuyến nghị)
4. Kết nối email của bạn
5. Copy Service ID

BƯỚC 3: TẠO EMAIL TEMPLATE
1. Vào Dashboard > Email Templates
2. Click "Create New Template"
3. Dán template này vào:

---
Subject: [Booking Mới] {{car_type}} - {{from_name}}

Có booking mới từ website!

📋 THÔNG TIN KHÁCH HÀNG:
- Họ tên: {{from_name}}
- Email: {{from_email}}
- Điện thoại: {{phone}}
- CMND/CCCD: {{id_number}}

🚗 THÔNG TIN ĐẶT XE:
- Dòng xe: {{car_type}}
- Loại thuê: {{rental_type}}
- Thời gian: {{duration}}
- Ngày nhận: {{pickup_date}}
- Ngày trả: {{return_date}}
- Địa điểm nhận: {{pickup_location}}
- Địa điểm trả: {{return_location}}
- Tài xế: {{driver}}

💼 DỊCH VỤ BỔ SUNG:
{{services}}

📝 YÊU CẦU ĐẶC BIỆT:
{{special_requests}}

⏰ Thời gian đặt: {{booking_date}}
🔖 Mã booking: {{booking_id}}

---

4. Save template và copy Template ID

BƯỚC 4: LẤY PUBLIC KEY
1. Vào Dashboard > Account
2. Copy Public Key

BƯỚC 5: CẬP NHẬT FILE NÀY
Thay thế các giá trị trong EMAILJS_CONFIG ở trên:
- publicKey: Public Key của bạn
- serviceId: Service ID của bạn
- templateId: Template ID của bạn
- adminEmail: Email của bạn nhận thông báo

BƯỚC 6: TEST
1. Đặt xe thử trên website
2. Kiểm tra email
3. Nếu không nhận được, check spam folder

LƯU Ý:
- Miễn phí: 200 emails/tháng
- Không cần backend server
- Không cần credit card

*/

console.log('📧 EmailJS config loaded. Vui lòng cập nhật YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID');
