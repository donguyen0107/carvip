// ===== BOOKING FORM FUNCTIONALITY =====

let currentStep = 1;
const totalSteps = 3;

// Form elements
const form = document.getElementById('booking-form');
const carTypeSelect = document.getElementById('car-type');
const rentalTypeSelect = document.getElementById('rental-type');
const durationInput = document.getElementById('duration');
const pickupDateInput = document.getElementById('pickup-date');
const returnDateInput = document.getElementById('return-date');
const phoneInput = document.getElementById('phone');

// Summary elements
const summaryCar = document.getElementById('summary-car');
const summaryRental = document.getElementById('summary-rental');
const summaryDuration = document.getElementById('summary-duration');
const summaryPickup = document.getElementById('summary-pickup');
const summaryReturn = document.getElementById('summary-return');
const summaryBasePrice = document.getElementById('summary-base-price');
const summaryDiscount = document.getElementById('summary-discount');
const summaryServicesPrice = document.getElementById('summary-services-price');
const summaryTotal = document.getElementById('summary-total');

// Service prices
const servicePrices = {
    'baby-seat': 200000,
    'wifi': 100000,
    'airport': 500000,
    'decoration': 2000000
};

// ===== STEP NAVIGATION =====
function nextStep(step) {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show next step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update summary
    updateSummary();
}

function prevStep(step) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show previous step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FORM VALIDATION =====
function validateStep(step) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    let errorMessages = [];
    
    requiredFields.forEach(field => {
        // Check checkbox (terms checkbox)
        if (field.type === 'checkbox') {
            if (!field.checked) {
                field.classList.add('error');
                isValid = false;
                errorMessages.push('Bạn phải đồng ý với điều khoản dịch vụ');
                
                // Highlight terms label
                const label = field.closest('label');
                if (label) {
                    label.style.border = '2px solid #e74c3c';
                    label.style.padding = '10px';
                    label.style.borderRadius = '8px';
                    label.style.backgroundColor = '#fee';
                }
            } else {
                field.classList.remove('error');
                const label = field.closest('label');
                if (label) {
                    label.style.border = '';
                    label.style.padding = '';
                    label.style.backgroundColor = '';
                }
            }
        } 
        // Check text/select/email/tel fields
        else if (!field.value || !field.value.trim()) {
            field.classList.add('error');
            isValid = false;
            
            const fieldName = field.placeholder || field.id || 'Trường này';
            errorMessages.push(`${fieldName} không được để trống`);
            
            // Show error message
            if (!field.nextElementSibling?.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#e74c3c';
                errorMsg.style.fontSize = '0.875rem';
                errorMsg.style.display = 'block';
                errorMsg.style.marginTop = '5px';
                errorMsg.textContent = 'Vui lòng điền thông tin này';
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            const errorMsg = field.nextElementSibling;
            if (errorMsg?.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    if (!isValid) {
        const firstError = errorMessages[0] || 'Vui lòng điền đầy đủ thông tin bắt buộc!';
        alert('⚠️ ' + firstError);
        
        // Scroll to first error field
        const firstErrorField = currentStepElement.querySelector('[required].error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }
    
    return isValid;
}

// ===== UPDATE SUMMARY =====
function updateSummary() {
    // Car and rental type
    const carType = carTypeSelect.value;
    const rentalType = rentalTypeSelect.value;
    const duration = parseInt(durationInput.value) || 0;
    
    if (carType) {
        let carText = carTypeSelect.options[carTypeSelect.selectedIndex].text;
        // Try to use i18n for car type display
        if (typeof t === 'function') {
            if (carType === 's-class') carText = t('booking.s_class');
            else if (carType === 'e-class') carText = t('booking.e_class');
            else if (carType === 'c-class') carText = t('booking.c_class');
            else if (carType === 'gls') carText = t('booking.gls');
            else if (carType === 'gle') carText = t('booking.gle');
            else if (carType === 'glc') carText = t('booking.glc');
        }
        summaryCar.textContent = carText;
    }
    
    if (rentalType) {
        let rentalText = rentalTypeSelect.options[rentalTypeSelect.selectedIndex].text;
        // Try to use i18n for rental type display
        if (typeof t === 'function') {
            if (rentalType === 'hourly') rentalText = t('booking.rental_hourly');
            else if (rentalType === 'daily') rentalText = t('booking.rental_daily');
            else if (rentalType === 'monthly') rentalText = t('booking.rental_monthly');
        }
        summaryRental.textContent = rentalText;
        
        let durationText = duration;
        if (typeof t === 'function') {
            if (rentalType === 'hourly') durationText += ' ' + t('booking.hourly_unit');
            else if (rentalType === 'daily') durationText += ' ' + t('booking.daily_unit');
            else if (rentalType === 'monthly') durationText += ' ' + t('booking.monthly_unit');
        } else {
            if (rentalType === 'hourly') durationText += ' giờ';
            else if (rentalType === 'daily') durationText += ' ngày';
            else if (rentalType === 'monthly') durationText += ' tháng';
        }
        
        summaryDuration.textContent = durationText;
    }
    
    // Dates
    if (pickupDateInput.value) {
        const pickupDate = new Date(pickupDateInput.value);
        summaryPickup.textContent = formatDate(pickupDate);
    }
    
    if (returnDateInput.value) {
        const returnDate = new Date(returnDateInput.value);
        summaryReturn.textContent = formatDate(returnDate);
    }
    
    // Calculate price
    calculateTotalPrice();
}

// ===== CALCULATE PRICE =====
function calculateTotalPrice() {
    const carType = carTypeSelect.value;
    const rentalType = rentalTypeSelect.value;
    const duration = parseInt(durationInput.value) || 0;
    
    if (!carType || !rentalType || !duration) {
        return;
    }
    
    // Get base price
    const priceResult = window.carRental.calculatePrice(carType, duration, rentalType);
    
    // Calculate additional services
    let servicesTotal = 0;
    const selectedServices = document.querySelectorAll('input[name="services"]:checked');
    
    selectedServices.forEach(service => {
        const serviceValue = service.value;
        let servicePrice = servicePrices[serviceValue] || 0;
        
        // Multiply by duration for daily services
        if (rentalType === 'daily' && (serviceValue === 'baby-seat' || serviceValue === 'wifi')) {
            servicePrice *= duration;
        }
        
        servicesTotal += servicePrice;
    });
    
    // Update summary
    summaryBasePrice.textContent = window.carRental.formatCurrency(priceResult.basePrice);
    
    if (priceResult.discount > 0) {
        document.getElementById('discount-row').style.display = 'flex';
        summaryDiscount.textContent = `-${window.carRental.formatCurrency(priceResult.discountAmount)}`;
    } else {
        document.getElementById('discount-row').style.display = 'none';
    }
    
    if (servicesTotal > 0) {
        document.getElementById('services-price-row').style.display = 'flex';
        summaryServicesPrice.textContent = window.carRental.formatCurrency(servicesTotal);
    } else {
        document.getElementById('services-price-row').style.display = 'none';
    }
    
    const finalTotal = priceResult.finalPrice + servicesTotal;
    summaryTotal.textContent = window.carRental.formatCurrency(finalTotal);
    
    // Update services list
    updateServicesList(selectedServices);
}

// ===== UPDATE SERVICES LIST =====
function updateServicesList(selectedServices) {
    const servicesList = document.getElementById('summary-services-list');
    const servicesSection = document.getElementById('services-summary');
    
    if (selectedServices.length > 0) {
        servicesSection.style.display = 'block';
        servicesList.innerHTML = '';
        
        selectedServices.forEach(service => {
            const serviceLabel = service.parentElement.querySelector('span').textContent;
            const div = document.createElement('div');
            div.className = 'summary-item';
            div.innerHTML = `
                <span class="summary-label">• ${serviceLabel.split('(')[0]}</span>
            `;
            servicesList.appendChild(div);
        });
    } else {
        servicesSection.style.display = 'none';
    }
}

// ===== FORMAT DATE =====
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// ===== APPLY PROMO CODE =====
function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const code = promoInput.value.trim().toUpperCase();
    
    const validCodes = {
        'WELCOME10': 0.10,
        'SUMMER20': 0.20,
        'VIP15': 0.15
    };
    
    if (validCodes[code]) {
        alert(`Mã khuyến mãi "${code}" đã được áp dụng! Giảm ${validCodes[code] * 100}%`);
        // Here you would apply the discount
        calculateTotalPrice();
    } else {
        alert('Mã khuyến mãi không hợp lệ!');
    }
}

// ===== PHONE NUMBER FORMATTING =====
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = window.carRental.formatPhoneNumber(e.target.value);
    });
}

// ===== AUTO CALCULATE RETURN DATE =====
function autoCalculateReturnDate() {
    const pickupDate = pickupDateInput.value;
    const rentalType = rentalTypeSelect.value;
    const duration = parseInt(durationInput.value) || 0;
    
    if (!pickupDate || !rentalType || !duration) return;
    
    const pickup = new Date(pickupDate);
    let returnDate = new Date(pickup);
    
    if (rentalType === 'hourly') {
        returnDate.setHours(returnDate.getHours() + duration);
    } else if (rentalType === 'daily') {
        returnDate.setDate(returnDate.getDate() + duration);
    } else if (rentalType === 'monthly') {
        returnDate.setMonth(returnDate.getMonth() + duration);
    }
    
    // Format for datetime-local input
    const year = returnDate.getFullYear();
    const month = String(returnDate.getMonth() + 1).padStart(2, '0');
    const day = String(returnDate.getDate()).padStart(2, '0');
    const hours = String(returnDate.getHours()).padStart(2, '0');
    const minutes = String(returnDate.getMinutes()).padStart(2, '0');
    
    returnDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    updateSummary();
}

// ===== EVENT LISTENERS =====
carTypeSelect.addEventListener('change', updateSummary);
rentalTypeSelect.addEventListener('change', () => {
    updateSummary();
    autoCalculateReturnDate();
});
durationInput.addEventListener('input', () => {
    updateSummary();
    autoCalculateReturnDate();
});
pickupDateInput.addEventListener('change', () => {
    updateSummary();
    autoCalculateReturnDate();
});
returnDateInput.addEventListener('change', updateSummary);

// Services checkboxes
document.querySelectorAll('input[name="services"]').forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotalPrice);
});

// ===== FORM SUBMISSION =====
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('🚀 Form submitted!');
    
    // Validate ALL steps before submitting
    let allValid = true;
    
    for (let step = 1; step <= 3; step++) {
        if (!validateStep(step)) {
            console.log(`❌ Validation failed on step ${step}`);
            allValid = false;
            
            // Show the step with error
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
            currentStep = step;
            
            alert(`⚠️ Vui lòng quay lại bước ${step} và điền đầy đủ thông tin!`);
            return;
        }
    }
    
    console.log('✅ All validations passed!');
    
    // Get form data
    const formData = {
        carType: carTypeSelect.value,
        rentalType: rentalTypeSelect.value,
        duration: durationInput.value,
        pickupDate: pickupDateInput.value,
        returnDate: returnDateInput.value,
        driver: document.querySelector('input[name="driver"]:checked').value,
        fullName: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        idNumber: document.getElementById('id-number').value,
        pickupLocation: document.getElementById('pickup-location').value,
        returnLocation: document.getElementById('return-location').value,
        services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value),
        specialRequests: document.getElementById('special-requests').value,
        promoCode: document.getElementById('promo-code').value
    };
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
    
    console.log('⏳ Loading state activated');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    window.carRental.saveFormData('booking', formData);
    
    // Send email notification
    let emailResult = { success: true, message: '✅ Đặt xe thành công! Chúng tôi sẽ liên hệ với bạn sớm.' };
    
    try {
        if (typeof sendBookingEmail === 'function') {
            console.log('📧 Đang gửi email...');
            emailResult = await sendBookingEmail(formData);
            console.log('📧 Kết quả gửi email:', emailResult);
        } else {
            console.warn('⚠️ sendBookingEmail function không tồn tại');
            console.log('📧 Thông tin booking:', formData);
        }
    } catch (error) {
        console.error('❌ Lỗi khi gửi email:', error);
        emailResult = { 
            success: false, 
            message: '✅ Đặt xe thành công! Email thông báo sẽ được gửi sau.' 
        };
    }
    
    // Show success modal
    showModal(emailResult.message);
    
    // Reset form
    form.reset();
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
    
    // Remove loading state
    if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
    
    console.log('✅ Booking process completed!');
});

// ===== MODAL FUNCTIONS =====
function showModal(customMessage) {
    const modal = document.getElementById('success-modal');
    
    // Update message if provided
    if (customMessage) {
        const modalText = modal.querySelector('.modal-text');
        if (modalText) {
            modalText.textContent = customMessage;
        }
    }
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
document.getElementById('success-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'success-modal') {
        closeModal();
    }
});

// ===== SET MINIMUM DATE TO TODAY =====
const today = new Date();
const minDateTime = today.toISOString().slice(0, 16);
pickupDateInput.setAttribute('min', minDateTime);
returnDateInput.setAttribute('min', minDateTime);

// ===== LOAD SAVED FORM DATA =====
window.addEventListener('load', () => {
    const savedData = window.carRental.loadFormData('booking');
    if (savedData) {
        // Optionally restore form data
        console.log('Previous booking data found:', savedData);
    }
    
    // Check for URL parameters (car selection from homepage)
    const urlParams = new URLSearchParams(window.location.search);
    const carParam = urlParams.get('car');
    const packageParam = urlParams.get('package');
    
    if (carParam) {
        carTypeSelect.value = carParam;
        updateSummary();
    }
    
    if (packageParam) {
        rentalTypeSelect.value = packageParam;
        updateSummary();
    }
});

console.log('✅ Booking system loaded successfully');
