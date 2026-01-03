// ===== INTERNATIONALIZATION (i18n) =====
// Language translations for Vietnamese and English

const translations = {
    vi: {
        // Navigation
        'nav.home': 'Trang Chủ',
        'nav.fleet': 'Dòng Xe',
        'nav.services': 'Dịch Vụ',
        'nav.trusted_clients': 'Khách Hàng Thân Thiết',
        'nav.reviews': 'Đánh Giá',
        'nav.contact': 'Liên Hệ',
        'nav.booking': 'Đặt Xe Ngay',
        'nav.language': 'Ngôn Ngữ',

        // Home Page
        'hero.subtitle': 'Trải Nghiệm Đẳng Cấp',
        'hero.description': 'Dịch vụ cho thuê xe Mercedes cao cấp với đội xe mới nhất, tài xế chuyên nghiệp và dịch vụ khách hàng tận tâm.',
        'hero.book': 'Đặt Xe Ngay',
        'hero.fleet': 'Xem Dòng Xe',
        'hero.scroll': 'Cuộn xuống',

        // Fleet Section - Home
        'fleet.subtitle': 'Đội Xe Của Chúng Tôi',
        'fleet.title': 'Dòng Xe Mercedes Cao Cấp',
        'fleet.description': 'Lựa chọn từ bộ sưu tập xe Mercedes mới nhất, được bảo dưỡng hoàn hảo',
        'fleet.popular': 'Phổ Biến',
        'fleet.premium': 'Premium',
        'fleet.rating': 'Đánh Giá',
        'fleet.details': 'Xem Chi Tiết',

        // Car Information
        'car.s_class_title': 'Mercedes S-Class',
        'car.s_class_desc': 'Dịch vụ xe Mercedes S-Class với tài xế riêng, dành cho doanh nhân, khách VIP và các chuyến đón tiễn sân bay cao cấp. Trải nghiệm sự êm ái, riêng tư và đẳng cấp hàng đầu, phù hợp cho công tác, sự kiện quan trọng và di chuyển sang trọng.',
        'car.e_class_title': 'Mercedes E-Class',
        'car.e_class_desc': 'Dòng xe Mercedes E-Class mang đến sự cân bằng hoàn hảo giữa sang trọng, tiện nghi và hiệu suất, lý tưởng cho các chuyến công tác, gặp gỡ đối tác với phong cách chuyên nghiệp. Lựa chọn tối ưu cho khách hàng yêu cầu chất lượng cao.',
        'car.c_class_title': 'Mercedes C-Class',
        'car.c_class_desc': 'Thể thao và năng động cho những chuyến đi tươi vui',
        'car.v_class_title': 'Mercedes V-Class',
        'car.v_class_desc': 'Mercedes V-Class là lựa chọn hoàn hảo cho dịch vụ đưa đón sân bay, gia đình hoặc nhóm từ 4–6 người. Không gian rộng rãi, thoải mái, khoang hành lý lớn, kết hợp cùng tài xế chuyên nghiệp mang đến trải nghiệm an toàn và đẳng cấp.',
        'car.gls_title': 'Mercedes GLS',
        'car.gls_desc': 'SUV hạng sang 7 chỗ với không gian thoải mái',
        'car.gle_title': 'Mercedes GLE',
        'car.gle_desc': 'SUV 5 chỗ linh hoạt cho gia đình',
        'car.glc_title': 'Mercedes GLC',
        'car.glc_desc': 'SUV compact nhỏ gọn, dễ xoay',
        'car.learn_more': 'Tìm Hiểu Thêm',
        'car.book_now': 'Đặt Xe',
        'car.seats': 'chỗ',
        'car.transmission': 'Tự động',
        'car.fuel': 'Xăng',

        // Services Section
        'services.title': 'Dịch Vụ Cao Cấp',
        'services.subtitle': 'Những Dịch Vụ Của Chúng Tôi',
        'services.description': 'Chúng tôi cung cấp các dịch vụ cho thuê xe đa dạng để đáp ứng nhu cầu của bạn',
        'services.airport_transfer': 'Dịch Vụ Sân Bay',
        'services.airport_desc': 'Đưa đón sân bay nhanh chóng và an toàn',
        'services.corporate_travel': 'Du Lịch Công Vụ',
        'services.corporate_desc': 'Dùng cho các chuyến công tác chuyên nghiệp',
        'services.wedding': 'Đám Cưới',
        'services.wedding_desc': 'Trang trí tinh tế cho ngày trọng đại của bạn',
        'services.events': 'Sự Kiện',
        'services.events_desc': 'Hỗ trợ xe cho các sự kiện và tiệc tùng',

        // Trusted Clients Section
        'trusted.subtitle': 'Các Khách Hàng Thân Thiết',
        'trusted.title': 'Được Tin Tưởng Bởi',
        'trusted.description': 'Chúng tôi vinh dự được phục vụ các công ty hàng đầu và doanh nhân uy tín trên toàn thế giới',

        // Pricing Section
        'pricing.title': 'Bảng Giá',
        'pricing.subtitle': 'Các Gói Giá Của Chúng Tôi',
        'pricing.description': 'Lựa chọn gói giá phù hợp với nhu cầu của bạn',
        'pricing.hourly': 'Theo Giờ',
        'pricing.daily': 'Theo Ngày',
        'pricing.monthly': 'Theo Tháng',
        'pricing.choose': 'Chọn Gói Này',
        'pricing.popular_badge': 'Phổ Biến',

        // Reviews Section
        'reviews.title': 'Đánh Giá Khách Hàng',
        'reviews.subtitle': 'Những Nhận Xét Từ Khách Hàng',
        'reviews.description': 'Hãy xem những gì khách hàng của chúng tôi nói về chúng tôi',
        'reviews.recent_title': 'Đánh Giá Gần Đây',
        'reviews.no_reviews': 'Chưa có đánh giá nào. Hãy là người đầu tiên!',
        'reviews.view_all': 'Xem tất cả dòng xe',
        'hero.scroll_text': 'Cuộn xuống',

        // Booking Page
        'booking.hero_title': 'Đặt Xe Mercedes',
        'booking.hero_description': 'Điền thông tin để đặt xe. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.',
        'booking.step_car_selection': 'Chọn Xe',
        'booking.step_rental_info': 'Thông Tin Thuê',
        'booking.step_driver_info': 'Thông Tin Tài Xế',
        'booking.step_payment': 'Thanh Toán',
        'booking.car_type': 'Dòng Xe',
        'booking.select_car': '-- Chọn dòng xe --',
        'booking.pickup_date': 'Ngày Nhận',
        'booking.return_date': 'Ngày Trả',
        'booking.location': 'Địa Điểm',
        'booking.driver_name': 'Tên Tài Xế',
        'booking.phone': 'Số Điện Thoại',
        'booking.email': 'Email',
        'booking.submit': 'Gửi Đặt Xe',
        'booking.success': 'Đặt xe thành công!',

        // Fleet Page
        'fleet_page.title': 'Bộ Sưu Tập Mercedes',
        'fleet_page.description': 'Khám phá đội xe Mercedes cao cấp của chúng tôi',
        'fleet_page.search_placeholder': 'Tìm kiếm xe...',
        'fleet_page.all': 'Tất Cả',
        'fleet_page.sedan': 'Sedan',
        'fleet_page.suv': 'SUV',

        // Contact Page
        'contact.hero_title': 'Liên Hệ Với Chúng Tôi',
        'contact.hero_description': 'Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7',
        'contact.info_title': 'Thông Tin Liên Hệ',
        'contact.info_description': 'Hãy liên hệ với chúng tôi qua bất kỳ kênh nào dưới đây. Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn.',
        'contact.phone': 'Điện Thoại',
        'contact.email': 'Email',
        'contact.address': 'Địa Chỉ',
        'contact.form_title': 'Gửi Thông Tin',
        'contact.name': 'Tên Của Bạn',
        'contact.message': 'Tin Nhắn',
        'contact.send': 'Gửi',

        // Services
        'services.airport_transfer': 'Dịch Vụ Sân Bay',
        'services.corporate_travel': 'Du Lịch Công Vụ',
        'services.wedding': 'Đám Cưới',
        'services.events': 'Sự Kiện',

        // Pricing
        'pricing.title': 'Bảng Giá',
        'pricing.hourly': 'Theo Giờ',
        'pricing.daily': 'Theo Ngày',
        'pricing.monthly': 'Theo Tháng',

        // Footer
        'footer.company': 'Công Ty',
        'footer.services': 'Dịch Vụ',
        'footer.contact': 'Liên Hệ',
        'footer.copyright': 'Bản Quyền © 2024 BOOKCARVIP. Tất Cả Các Quyền Được Bảo Vệ.',

        // Services Cards Details
        'service.icon_airport': 'Dịch Vụ Sân Bay',
        'service.desc_airport': 'Đưa đón sân bay nhanh chóng và an toàn',
        'service.icon_corporate': 'Du Lịch Công Vụ',
        'service.desc_corporate': 'Dùng cho các chuyến công tác chuyên nghiệp',
        'service.icon_wedding': 'Đám Cưới',
        'service.desc_wedding': 'Trang trí tinh tế cho ngày trọng đại của bạn',
        'service.icon_events': 'Sự Kiện',
        'service.desc_events': 'Hỗ trợ xe cho các sự kiện và tiệc tùng',

        // Premium Services Section
        'service.latest_fleet': 'Đội Xe Mới Nhất',
        'service.latest_fleet_desc': '100% xe Mercedes đời mới, được bảo dưỡng định kỳ và kiểm tra kỹ lưỡng',
        'service.professional_drivers': 'Tài Xế Chuyên Nghiệp',
        'service.professional_drivers_desc': 'Đội ngũ tài xế giàu kinh nghiệm, lịch sự và am hiểu địa phương',
        'service.full_insurance': 'Bảo Hiểm Toàn Diện',
        'service.full_insurance_desc': 'Bảo hiểm đầy đủ cho xe và hành khách, đảm bảo an toàn tuyệt đối',
        'service.support_24_7': 'Hỗ Trợ 24/7',
        'service.support_24_7_desc': 'Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ mọi lúc, mọi nơi',
        'service.competitive_price': 'Giá Cạnh Tranh',
        'service.competitive_price_desc': 'Bảng giá minh bạch, nhiều ưu đãi hấp dẫn cho khách hàng thân thiết',
        'service.on_time': 'Đúng Giờ',
        'service.on_time_desc': 'Cam kết đón đúng giờ, không để quý khách phải chờ đợi',

        // Pricing Features
        'pricing.min_4_hours': 'Tối thiểu 4 giờ',
        'pricing.professional_driver': 'Tài xế chuyên nghiệp',
        'pricing.fuel_toll': 'Xăng & phí đường',
        'pricing.free_water': 'Nước uống miễn phí',
        'pricing.8hours_200km': '8 giờ/ngày hoặc 200km',
        'pricing.free_towel': 'Nước uống & khăn lạnh',
        'pricing.wifi': 'Wifi trên xe',
        'pricing.unlimited_km': 'Không giới hạn km',
        'pricing.private_driver': 'Tài xế riêng',
        'pricing.all_costs': 'Tất cả chi phí',
        'pricing.priority_support': 'Ưu tiên hỗ trợ',
        'pricing.free_maintenance': 'Bảo dưỡng miễn phí',
        'pricing.choose_plan': 'Chọn Gói',

        // Booking Form
        'booking.s_class': 'Mercedes S-Class (Sedan cao cấp)',
        'booking.e_class': 'Mercedes E-Class (Sedan hạng sang)',
        'booking.c_class': 'Mercedes C-Class (Sedan thể thao)',
        'booking.gls': 'Mercedes GLS (SUV 7 chỗ)',
        'booking.gle': 'Mercedes GLE (SUV 5 chỗ)',
        'booking.glc': 'Mercedes GLC (SUV compact)',
        'booking.rental_hourly': 'Theo Giờ (tối thiểu 4h)',
        'booking.rental_daily': 'Theo Ngày (8h/ngày)',
        'booking.rental_monthly': 'Theo Tháng',
        'booking.next': 'Tiếp Theo',
        'booking.previous': 'Quay Lại',
        'booking.complete': 'Hoàn Thành',

        // Booking Form - Additional fields
        'booking.select_rental': '-- Chọn loại thuê --',
        'booking.rental_type_label': 'Loại Thuê',
        'booking.duration_label': 'Thời Gian',
        'booking.duration_placeholder': 'Nhập số lượng',
        'booking.driver_service': 'Dịch Vụ Tài Xế',
        'booking.with_driver': 'Có tài xế',
        'booking.self_drive': 'Tự lái',
        'booking.id_number': 'CMND/CCCD',
        'booking.id_placeholder': '001234567890',
        'booking.special_requests': 'Yêu Cầu Đặc Biệt',
        'booking.promo_code': 'Mã Khuyến Mãi',
        'booking.promo_placeholder': 'Nhập mã khuyến mãi',
        'booking.apply_promo': 'Áp Dụng',
        'booking.terms': 'Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật',

        // Booking Summary
        'booking.order_details': 'Chi Tiết Đơn Hàng',
        'booking.car_type_label': 'Dòng xe:',
        'booking.rental_type': 'Loại thuê:',
        'booking.duration_time': 'Thời gian:',
        'booking.pickup': 'Nhận xe:',
        'booking.return': 'Trả xe:',
        'booking.not_selected': 'Chưa chọn',
        'booking.additional_services': 'Dịch vụ bổ sung:',
        'booking.base_price': 'Giá cơ bản:',
        'booking.discount': 'Giảm giá:',
        'booking.services_price': 'Dịch vụ thêm:',
        'booking.total': 'Tổng cộng:',
        'booking.baby_seat': 'Ghế em bé (+200.000đ/ngày)',
        'booking.wifi_service': 'Wifi 4G trên xe (+100.000đ/ngày)',
        'booking.airport_transfer': 'Đón/tiễn sân bay (+500.000đ)',
        'booking.wedding_decoration': 'Trang trí xe cưới (+2.000.000đ)',

        // Comments/Reviews
        'comment.title': 'Viết Đánh Giá',
        'comment.name': 'Tên Của Bạn',
        'comment.email': 'Email',
        'comment.rating': 'Đánh Giá',
        'comment.message': 'Chia Sẻ Trải Nghiệm',
        'comment.submit': 'Gửi Đánh Giá',
        'comment.placeholder': 'Chia sẻ trải nghiệm của bạn với chúng tôi...',

        // Booking Summary - Additional Info
        'booking.price_includes_vat': 'Giá đã bao gồm VAT. Chưa bao gồm phí vượt quá km quy định và các phí phát sinh khác.',
        'booking.need_support': 'Cần Hỗ Trợ?',
        'booking.hourly_unit': 'giờ',
        'booking.daily_unit': 'ngày',
        'booking.monthly_unit': 'tháng',

        // Success Modal
        'booking.success_title': 'Đặt Xe Thành Công!',
        'booking.success_message': 'Cảm ơn bạn đã đặt xe. Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút để xác nhận đơn hàng.',
        'booking.back_home': 'Về Trang Chủ',
        'booking.close': 'Đóng',

        // Fleet Page Details
        'fleet.page_title': 'Bộ Sưu Tập Mercedes',
        'fleet.page_description': 'Khám phá đội xe Mercedes cao cấp của chúng tôi',
        'fleet.search_placeholder': 'Tìm kiếm xe...',
        'fleet.filter_all': 'Tất Cả',
        'fleet.filter_sedan': 'Sedan',
        'fleet.filter_suv': 'SUV',
        'fleet.view_all': 'Xem Tất Cả Dòng Xe',
        'fleet.view_details': 'Xem Chi Tiết',
        'fleet.book': 'Đặt Xe',

        // Fleet Car Descriptions
        'fleet.s_class_desc': 'Đỉnh cao của sự sang trọng và công nghệ. Lựa chọn hoàn hảo cho các sự kiện quan trọng và đối tác VIP.',
        'fleet.e_class_desc': 'Cân bằng hoàn hảo giữa sang trọng và thể thao. Phù hợp cho các chuyến công tác và du lịch dài ngày.',
        'fleet.c_class_desc': 'Sedan thể thao với thiết kế trẻ trung. Lựa chọn thông minh cho chuyến đi hàng ngày với phong cách.',
        'fleet.gls_desc': 'SUV hạng sang 7 chỗ với không gian rộng. Hoàn hảo cho gia đình và các chuyến du lịch dài.',
        'fleet.gle_desc': 'SUV 5 chỗ linh hoạt với hiệu suất cao. Kết hợp giữa tiện nghi và khả năng vận hành vượt trội.',
        'fleet.glc_desc': 'SUV compact với thiết kế hiện đại. Lựa chọn hoàn hảo cho những ai yêu thích tự do di chuyển.',

        // CTA Sections
        'cta.ready_experience': 'Sẵn Sàng Trải Nghiệm Đẳng Cấp Mercedes?',
        'cta.ready_description': 'Liên hệ với chúng tôi ngay hôm nay để bắt đầu hành trình của bạn với dòng xe Mercedes sang trọng của chúng tôi.',
        'cta.contact_us': 'Liên Hệ Với Chúng Tôi',
        'cta.not_found': 'Không Tìm Thấy Xe Phù Hợp?',
        'cta.not_found_description': 'Nếu bạn không tìm thấy xe mình yêu thích, hãy liên hệ với đội tư vấn của chúng tôi. Chúng tôi sẽ giúp bạn tìm giải pháp tốt nhất.',
        'cta.ask_advisor': 'Hỏi Cố Vấn',

        // Admin
        'admin.dashboard': 'Bảng Điều Khiển',
        'admin.bookings': 'Đặt Xe',
        'admin.customers': 'Khách Hàng',
        'admin.fleet': 'Xe',
        'admin.users': 'Người Dùng',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.fleet': 'Fleet',
        'nav.services': 'Services',
        'nav.trusted_clients': 'Trusted Clients',
        'nav.reviews': 'Reviews',
        'nav.contact': 'Contact',
        'nav.booking': 'Book Now',
        'nav.language': 'Language',

        // Home Page
        'hero.subtitle': 'Experience Luxury',
        'hero.description': 'Premium Mercedes rental service with the latest fleet, professional drivers, and dedicated customer service.',
        'hero.book': 'Book Now',
        'hero.fleet': 'View Fleet',
        'hero.scroll': 'Scroll Down',

        // Fleet Section - Home
        'fleet.subtitle': 'Our Fleet',
        'fleet.title': 'Premium Mercedes Fleet',
        'fleet.description': 'Choose from the latest collection of Mercedes vehicles, perfectly maintained',
        'fleet.popular': 'Popular',
        'fleet.premium': 'Premium',
        'fleet.rating': 'Rating',
        'fleet.details': 'View Details',

        // Car Information
        'car.s_class_title': 'Mercedes S-Class',
        'car.s_class_desc': 'Mercedes S-Class service with private driver for businessmen, VIP guests and premium airport transfers. Experience comfort, privacy and superior elegance, suitable for business trips, important events and luxury travel.',
        'car.e_class_title': 'Mercedes E-Class',
        'car.e_class_desc': 'Mercedes E-Class offers perfect balance between luxury, comfort and performance, ideal for business trips, client meetings or daily commute with professional style. Optimal choice for customers demanding high quality.',
        'car.c_class_title': 'Mercedes C-Class',
        'car.c_class_desc': 'Sporty and dynamic for enjoyable trips',
        'car.v_class_title': 'Mercedes V-Class',
        'car.v_class_desc': 'Perfect choice for airport transfers, families or groups of 4-6 passengers. Spacious and comfortable interior with large luggage compartment, combined with professional driver for safe and premium experience.',
        'car.gls_title': 'Mercedes GLS',
        'car.gls_desc': 'Premium 7-seater SUV with comfortable space',
        'car.gle_title': 'Mercedes GLE',
        'car.gle_desc': 'Flexible 5-seater SUV for families',
        'car.glc_title': 'Mercedes GLC',
        'car.glc_desc': 'Compact SUV, easy to maneuver',
        'car.learn_more': 'Learn More',
        'car.book_now': 'Book Now',
        'car.seats': 'seats',
        'car.transmission': 'Automatic',
        'car.fuel': 'Petrol',

        // Services Section
        'services.title': 'Premium Services',
        'services.subtitle': 'Our Services',
        'services.description': 'We provide a variety of car rental services to meet your needs',
        'services.airport_transfer': 'Airport Transfer',
        'services.airport_desc': 'Quick and safe airport transportation',
        'services.corporate_travel': 'Corporate Travel',
        'services.corporate_desc': 'For professional business trips',
        'services.wedding': 'Wedding',
        'services.wedding_desc': 'Elegant decoration for your special day',
        'services.events': 'Events',
        'services.events_desc': 'Vehicle support for events and parties',

        // Trusted Clients Section
        'trusted.subtitle': 'Our Loyal Clients',
        'trusted.title': 'Trusted By',
        'trusted.description': 'We are proud to serve leading companies and reputable entrepreneurs around the world',

        // Pricing Section
        'pricing.title': 'Pricing',
        'pricing.subtitle': 'Our Pricing Plans',
        'pricing.description': 'Choose a pricing plan that suits your needs',
        'pricing.hourly': 'Hourly',
        'pricing.daily': 'Daily',
        'pricing.monthly': 'Monthly',
        'pricing.choose': 'Choose This Plan',
        'pricing.popular_badge': 'Popular',

        // Reviews Section
        'reviews.title': 'Customer Reviews',
        'reviews.subtitle': 'What Our Customers Say',
        'reviews.description': 'See what our customers think about us',
        'reviews.recent_title': 'Recent Reviews',
        'reviews.no_reviews': 'No reviews yet. Be the first to review!',
        'reviews.view_all': 'View All Fleet',
        'hero.scroll_text': 'Scroll Down',

        // Booking Page
        'booking.hero_title': 'Book Mercedes',
        'booking.hero_description': 'Fill in the information to book a car. We will contact you for confirmation within 30 minutes.',
        'booking.step_car_selection': 'Select Car',
        'booking.step_rental_info': 'Rental Info',
        'booking.step_driver_info': 'Driver Info',
        'booking.step_payment': 'Payment',
        'booking.car_type': 'Car Type',
        'booking.select_car': '-- Select a car type --',
        'booking.pickup_date': 'Pickup Date',
        'booking.return_date': 'Return Date',
        'booking.location': 'Location',
        'booking.driver_name': 'Driver Name',
        'booking.phone': 'Phone Number',
        'booking.email': 'Email',
        'booking.submit': 'Submit Booking',
        'booking.success': 'Booking successful!',

        // Fleet Page
        'fleet_page.title': 'Mercedes Collection',
        'fleet_page.description': 'Explore our premium Mercedes fleet',
        'fleet_page.search_placeholder': 'Search cars...',
        'fleet_page.all': 'All',
        'fleet_page.sedan': 'Sedan',
        'fleet_page.suv': 'SUV',

        // Contact Page
        'contact.hero_title': 'Contact Us',
        'contact.hero_description': 'We are available 24/7 to assist you',
        'contact.info_title': 'Contact Information',
        'contact.info_description': 'Get in touch with us through any of the channels below. Our team is ready to help.',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.address': 'Address',
        'contact.form_title': 'Send Message',
        'contact.name': 'Your Name',
        'contact.message': 'Message',
        'contact.send': 'Send',

        // Footer
        'footer.company': 'Company',
        'footer.services': 'Services',
        'footer.contact': 'Contact',
        'footer.copyright': 'Copyright © 2024 BOOKCARVIP. All Rights Reserved.',

        // Services Cards Details
        'service.icon_airport': 'Airport Transfer',
        'service.desc_airport': 'Quick and safe airport transportation',
        'service.icon_corporate': 'Corporate Travel',
        'service.desc_corporate': 'For professional business trips',
        'service.icon_wedding': 'Wedding',
        'service.desc_wedding': 'Elegant decoration for your special day',
        'service.icon_events': 'Events',
        'service.desc_events': 'Vehicle support for events and parties',

        // Premium Services Section
        'service.latest_fleet': 'Latest Fleet',
        'service.latest_fleet_desc': '100% new Mercedes vehicles, regularly maintained and thoroughly inspected',
        'service.professional_drivers': 'Professional Drivers',
        'service.professional_drivers_desc': 'Experienced, courteous drivers with local knowledge',
        'service.full_insurance': 'Full Insurance',
        'service.full_insurance_desc': 'Complete insurance coverage for vehicles and passengers for absolute safety',
        'service.support_24_7': '24/7 Support',
        'service.support_24_7_desc': 'Customer care team ready to assist anytime, anywhere',
        'service.competitive_price': 'Competitive Pricing',
        'service.competitive_price_desc': 'Transparent pricing with attractive offers for loyal customers',
        'service.on_time': 'On Time',
        'service.on_time_desc': 'Guaranteed punctual pickup, no waiting time for customers',

        // Pricing Features
        'pricing.min_4_hours': 'Minimum 4 hours',
        'pricing.professional_driver': 'Professional Driver',
        'pricing.fuel_toll': 'Fuel & Road Toll',
        'pricing.free_water': 'Free Water',
        'pricing.8hours_200km': '8 hours/day or 200km',
        'pricing.free_towel': 'Free Water & Towel',
        'pricing.wifi': 'WiFi on Board',
        'pricing.unlimited_km': 'Unlimited Kilometers',
        'pricing.private_driver': 'Private Driver',
        'pricing.all_costs': 'All Costs Included',
        'pricing.priority_support': 'Priority Support',
        'pricing.free_maintenance': 'Free Maintenance',
        'pricing.choose_plan': 'Choose Plan',

        // Booking Form
        'booking.s_class': 'Mercedes S-Class (Premium Sedan)',
        'booking.e_class': 'Mercedes E-Class (Luxury Sedan)',
        'booking.c_class': 'Mercedes C-Class (Sport Sedan)',
        'booking.gls': 'Mercedes GLS (7-Seater SUV)',
        'booking.gle': 'Mercedes GLE (5-Seater SUV)',
        'booking.glc': 'Mercedes GLC (Compact SUV)',
        'booking.rental_hourly': 'Hourly (Minimum 4 hours)',
        'booking.rental_daily': 'Daily (8 hours/day)',
        'booking.rental_monthly': 'Monthly',
        'booking.next': 'Next',
        'booking.previous': 'Previous',
        'booking.complete': 'Complete',

        // Booking Form - Additional fields
        'booking.select_rental': '-- Select rental type --',
        'booking.rental_type_label': 'Rental Type',
        'booking.duration_label': 'Duration',
        'booking.duration_placeholder': 'Enter quantity',
        'booking.driver_service': 'Driver Service',
        'booking.with_driver': 'With Driver',
        'booking.self_drive': 'Self Drive',
        'booking.id_number': 'ID Number',
        'booking.id_placeholder': '001234567890',
        'booking.special_requests': 'Special Requests',
        'booking.promo_code': 'Promo Code',
        'booking.promo_placeholder': 'Enter promo code',
        'booking.apply_promo': 'Apply',
        'booking.terms': 'I agree to the Terms of Service and Privacy Policy',

        // Booking Summary
        'booking.order_details': 'Order Details',
        'booking.car_type_label': 'Car Type:',
        'booking.rental_type': 'Rental Type:',
        'booking.duration_time': 'Duration:',
        'booking.pickup': 'Pickup:',
        'booking.return': 'Return:',
        'booking.not_selected': 'Not Selected',
        'booking.additional_services': 'Additional Services:',
        'booking.base_price': 'Base Price:',
        'booking.discount': 'Discount:',
        'booking.services_price': 'Additional Services:',
        'booking.total': 'Total:',
        'booking.baby_seat': 'Baby Seat (+200,000đ/day)',
        'booking.wifi_service': '4G WiFi on Board (+100,000đ/day)',
        'booking.airport_transfer': 'Airport Transfer (+500,000đ)',
        'booking.wedding_decoration': 'Wedding Decoration (+2,000,000đ)',

        // Comments/Reviews
        'comment.title': 'Write a Review',
        'comment.name': 'Your Name',
        'comment.email': 'Email',
        'comment.rating': 'Rating',
        'comment.message': 'Share Your Experience',
        'comment.submit': 'Submit Review',
        'comment.placeholder': 'Share your experience with us...',

        // Booking Summary - Additional Info
        'booking.price_includes_vat': 'Price includes VAT. Does not include fees for exceeding km limit and other incidental fees.',
        'booking.need_support': 'Need Support?',
        'booking.hourly_unit': 'hour(s)',
        'booking.daily_unit': 'day(s)',
        'booking.monthly_unit': 'month(s)',

        // Success Modal
        'booking.success_title': 'Booking Successful!',
        'booking.success_message': 'Thank you for booking with us. We will contact you within 30 minutes to confirm your order.',
        'booking.back_home': 'Back to Home',
        'booking.close': 'Close',

        // Fleet Page Details
        'fleet.page_title': 'Mercedes Collection',
        'fleet.page_description': 'Explore our premium Mercedes fleet',
        'fleet.search_placeholder': 'Search cars...',
        'fleet.filter_all': 'All',
        'fleet.filter_sedan': 'Sedan',
        'fleet.filter_suv': 'SUV',
        'fleet.view_all': 'View All Fleet',
        'fleet.view_details': 'View Details',
        'fleet.book': 'Book Now',

        // Fleet Car Descriptions
        'fleet.s_class_desc': 'The pinnacle of luxury and technology. Perfect choice for important events and VIP clients.',
        'fleet.e_class_desc': 'Perfect balance between luxury and sport. Ideal for business trips and long-distance travel.',
        'fleet.c_class_desc': 'Sporty sedan with contemporary design. Smart choice for daily commute with style.',
        'fleet.gls_desc': 'Premium 7-seater SUV with spacious interior. Perfect for families and long journeys.',
        'fleet.gle_desc': 'Flexible 5-seater SUV with high performance. Combines comfort with outstanding driving capabilities.',
        'fleet.glc_desc': 'Compact SUV with modern design. Perfect choice for those who love freedom of movement.',

        // CTA Sections
        'cta.ready_experience': 'Ready to Experience Mercedes Luxury?',
        'cta.ready_description': 'Contact us today to begin your journey with our exclusive Mercedes fleet.',
        'cta.contact_us': 'Contact Us',
        'cta.not_found': 'Can\'t Find the Right Car?',
        'cta.not_found_description': 'If you can\'t find your dream car, reach out to our advisory team. We\'ll help you find the perfect solution.',
        'cta.ask_advisor': 'Ask an Advisor',

        // Admin
        'admin.dashboard': 'Dashboard',
        'admin.bookings': 'Bookings',
        'admin.customers': 'Customers',
        'admin.fleet': 'Fleet',
        'admin.users': 'Users',
    }
};

// Current language (default: Vietnamese)
let currentLanguage = localStorage.getItem('language') || 'vi';

/**
 * Get translation for a key
 * @param {string} key - Translation key (e.g., 'nav.home')
 * @param {string} lang - Language code (optional, uses current language if not provided)
 * @returns {string} Translated text
 */
function t(key, lang = null) {
    const language = lang || currentLanguage;
    return translations[language]?.[key] || key;
}

/**
 * Set the current language and update the page
 * @param {string} lang - Language code ('vi' or 'en')
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not found`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all translatable elements
    updatePageLanguage();

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Dispatch custom event for language change
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

    // Update booking summary if updateSummary function exists
    if (typeof updateSummary === 'function') {
        updateSummary();
    }
}

/**
 * Get current language
 * @returns {string} Current language code
 */
function getLanguage() {
    return currentLanguage;
}

/**
 * Update all translatable elements on the page
 */
function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });

    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });

    // Update all elements with data-i18n-title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });

    // Update language switcher
    updateLanguageSwitcher();
}

/**
 * Update language switcher UI to show current language
 */
function updateLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

/**
 * Initialize i18n on page load
 */
function initI18n() {
    // Set the HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update page language
    updatePageLanguage();

    // Add event listeners to language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}