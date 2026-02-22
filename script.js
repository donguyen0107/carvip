// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Header background on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Scroll animations
    scrollAnimations();
});

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;
    
    const firstCounter = counters[0];
    if (!firstCounter) return;
    
    const rect = firstCounter.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        counterAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== SCROLL ANIMATIONS =====
function scrollAnimations() {
    const elements = document.querySelectorAll('.car-card, .service-card, .pricing-card, .testimonial-card');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            element.classList.add('scroll-animate', 'active');
        }
    });
}

// ===== BACK TO TOP BUTTON =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallax = heroSection.querySelector('.hero-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== TESTIMONIALS SLIDER (Simple Auto Slide) =====
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function slideTestimonials() {
    if (testimonialCards.length <= 3) return; // Don't slide if 3 or fewer cards
    
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0.4';
        card.style.transform = 'scale(0.95)';
    });
    
    const activeIndex = currentTestimonial % testimonialCards.length;
    testimonialCards[activeIndex].style.opacity = '1';
    testimonialCards[activeIndex].style.transform = 'scale(1)';
    
    currentTestimonial++;
}

// Auto slide every 5 seconds
if (testimonialCards.length > 0) {
    setInterval(slideTestimonials, 5000);
}

// ===== FORM VALIDATION (for booking page) =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===== PRICE CALCULATOR =====
function calculatePrice(carType, duration, durationUnit) {
    const prices = {
        's-class': { hourly: 350000, daily: 2500000, monthly: 60000000 },
        'e-class': { hourly: 250000, daily: 1800000, monthly: 45000000 },
        'c-class': { hourly: 200000, daily: 1500000, monthly: 38000000 },
        'gls': { hourly: 400000, daily: 3000000, monthly: 75000000 },
        'gle': { hourly: 300000, daily: 2200000, monthly: 55000000 },
        'glc': { hourly: 220000, daily: 1600000, monthly: 40000000 }
    };
    
    const carPrices = prices[carType] || prices['c-class'];
    let basePrice = 0;
    
    switch(durationUnit) {
        case 'hourly':
            basePrice = carPrices.hourly * duration;
            break;
        case 'daily':
            basePrice = carPrices.daily * duration;
            break;
        case 'monthly':
            basePrice = carPrices.monthly * duration;
            break;
    }
    
    // Discount for longer rentals
    let discount = 0;
    if (durationUnit === 'daily' && duration >= 7) {
        discount = 0.1; // 10% discount for 7+ days
    } else if (durationUnit === 'daily' && duration >= 30) {
        discount = 0.15; // 15% discount for 30+ days
    } else if (durationUnit === 'monthly' && duration >= 3) {
        discount = 0.15; // 15% discount for 3+ months
    }
    
    const finalPrice = basePrice * (1 - discount);
    return {
        basePrice,
        discount: discount * 100,
        finalPrice,
        discountAmount: basePrice - finalPrice
    };
}

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// ===== INITIALIZE ANIMATIONS ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Add fade-in animation to hero elements
    const heroElements = document.querySelectorAll('.hero-text > *, .hero-stats .stat-item');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initial scroll animation check
    scrollAnimations();
    
    // Initialize counter animation
    animateCounters();
});

// ===== MOUSE PARALLAX EFFECT =====
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.car-card, .service-card, .pricing-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        card.style.transform = `perspective(1000px) rotateY(${percentX * 2}deg) rotateX(${-percentY * 2}deg)`;
    });
});

// Reset transform when mouse leaves
document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
        const cards = document.querySelectorAll('.car-card, .service-card, .pricing-card');
        cards.forEach(card => {
            card.style.transform = '';
        });
    }
});

// ===== SEARCH FILTER (for fleet page) =====
function filterCars(searchTerm) {
    const carCards = document.querySelectorAll('.car-card');
    const term = searchTerm.toLowerCase();
    
    carCards.forEach(card => {
        const carName = card.querySelector('.car-name').textContent.toLowerCase();
        const carDescription = card.querySelector('.car-description').textContent.toLowerCase();
        
        if (carName.includes(term) || carDescription.includes(term)) {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== PHONE NUMBER FORMATTING =====
function formatPhoneNumber(input) {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, '');
    
    // Format as Vietnam phone number
    if (cleaned.length <= 3) {
        return cleaned;
    } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
}

// ===== LOCAL STORAGE FOR FORM DATA =====
function saveFormData(formId, data) {
    localStorage.setItem(formId, JSON.stringify(data));
}

function loadFormData(formId) {
    const data = localStorage.getItem(formId);
    return data ? JSON.parse(data) : null;
}

function clearFormData(formId) {
    localStorage.removeItem(formId);
}

// ===== EXPORT FUNCTIONS FOR USE IN OTHER PAGES =====
window.carRental = {
    calculatePrice,
    formatCurrency,
    validateForm,
    filterCars,
    formatPhoneNumber,
    saveFormData,
    loadFormData,
    clearFormData
};

// ===== MAKE CAR CARDS CLICKABLE =====
document.addEventListener('DOMContentLoaded', function() {
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        // Make entire card clickable
        card.addEventListener('click', function(e) {
            // Check if click was on a button or link
            if (e.target.closest('a') || e.target.closest('button')) {
                return; // Let the button/link handle the click
            }
            
            // Find the "Tìm Hiểu Thêm" link and navigate to it
            const detailLink = this.querySelector('.btn-secondary');
            if (detailLink) {
                window.location.href = detailLink.getAttribute('href');
            }
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
});

// ===== PRICE TABLE SWITCHER =====
document.addEventListener('DOMContentLoaded', function() {
    const priceSwitchBtns = document.querySelectorAll('.price-switch-btn');
    
    priceSwitchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const priceType = this.getAttribute('data-price-type');
            
            // Update active button
            priceSwitchBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update all price tables
            const hourlyTables = document.querySelectorAll('.hourly-price');
            const airportTables = document.querySelectorAll('.airport-price');
            
            if (priceType === 'hourly') {
                hourlyTables.forEach(table => table.classList.add('active'));
                airportTables.forEach(table => table.classList.remove('active'));
            } else if (priceType === 'airport') {
                hourlyTables.forEach(table => table.classList.remove('active'));
                airportTables.forEach(table => table.classList.add('active'));
            }
        });
    });
});

// ===== CONSOLE LOG (Remove in production) =====
console.log('%c🚗 Mercedes Luxury Rental Website Loaded Successfully!', 
    'color: #1a1a1a; font-size: 16px; font-weight: bold; background: #f5f5f5; padding: 10px;');
console.log('%cDeveloped with ❤️ for premium car rental experience', 
    'color: #666; font-size: 12px;');
