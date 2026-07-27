// ===== BLOG CAROUSEL FUNCTIONALITY =====
// Dynamically loads images from car folders and randomizes order

class BlogCarousel {
    constructor() {
        this.track = document.getElementById('car-carousel-track') || document.querySelector('.blog-carousel-track');
        
        // All images from car folders (eclass, sclass, vclass)
        this.carImages = [
            // E-Class images
            { src: 'sources/eclass/CARVIP.VN (1500 x 600 px) (680 x 500 px).png', alt: 'Mercedes E-Class', label: 'Mercedes E-Class', desc: 'Sedan sang trọng, tinh tế và vận hành êm ái' },
            { src: 'sources/eclass/Mercedes-E200-Exclusive-2022-mercedes-vietnam-24.jpg', alt: 'Mercedes E-Class Exterior', label: 'Mercedes E-Class', desc: 'Thiết kế ngoại thất hiện đại, đẳng cấp' },
            { src: 'sources/eclass/noi-that-mercedes-e-300-5.png', alt: 'Mercedes E-Class Interior', label: 'Nội Thất E-Class', desc: 'Không gian nội thất cao cấp, tiện nghi đỉnh cao' },
            // S-Class images
            { src: 'sources/sclass/CARVIP.VN (29).png', alt: 'Mercedes S-Class', label: 'Mercedes S-Class', desc: 'Biểu tượng của đẳng cấp và sang trọng hàng đầu' },
            { src: 'sources/sclass/MQF02994.jpg', alt: 'Mercedes S-Class Exterior', label: 'Mercedes S-Class', desc: 'Ngoại thất sang trọng, thiết kế tinh xảo' },
            { src: 'sources/sclass/Noi that s450.jpg', alt: 'Mercedes S450 Interior', label: 'Nội Thất S450', desc: 'Nội thất xa hoa với vật liệu cao cấp nhất' },
            { src: 'sources/sclass/noi that s4502.jpg', alt: 'Mercedes S450 Interior Detail', label: 'S-Class Dashboard', desc: 'Bảng điều khiển Mercedes S-Class công nghệ cao' },
            { src: 'sources/sclass/car9-768x512.jpg', alt: 'Mercedes S-Class Luxury', label: 'S-Class Premium', desc: 'Trải nghiệm đẳng cấp thượng lưu' },
            { src: 'sources/sclass/techsignin-anh-noi-that-mercedes-benz-e-class-2017-naias-2016-9.jpg', alt: 'Mercedes Interior', label: 'Nội Thất Mercedes', desc: 'Tiêu chuẩn nội thất hàng đầu thế giới' },
            // V-Class images
            { src: 'sources/vclass/2 (1).jpg', alt: 'Mercedes V-Class', label: 'Mercedes V-Class', desc: 'Xe gia đình sang trọng cho nhóm lớn' },
            { src: 'sources/vclass/Black Blue Minimalist Floral Logo (12).png', alt: 'Mercedes V-Class Logo', label: 'CARVIP V-Class', desc: 'Dịch vụ cho thuê V-Class chuyên nghiệp' },
            { src: 'sources/vclass/z6904030104678_1477300f5fb3fa23da48b445661c3b0c.jpg', alt: 'Mercedes V-Class Service', label: 'V-Class Service', desc: 'Dịch vụ tài xế riêng cao cấp cho nhóm khách' },        ];
        
        this.init();
    }
    
    // Fisher-Yates shuffle algorithm
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    init() {
        if (!this.track) {
            console.warn('Blog carousel track not found');
            return;
        }
        
        // Shuffle images randomly each time
        const shuffledImages = this.shuffleArray(this.carImages);
        
        // Generate slides
        this.generateSlides(shuffledImages);
        
        // Get slides after generation
        this.slides = this.track.querySelectorAll('.blog-carousel-slide');
        
        // Duplicate slides for infinite loop
        this.duplicateSlides();
        
        console.log('✅ Blog Carousel initialized with', shuffledImages.length, 'randomized car images');
    }
    
    generateSlides(images) {
        this.track.innerHTML = '';
        
        images.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'blog-carousel-slide';
            slide.innerHTML = `
                <div class="blog-card">
                    <div class="blog-card-image">
                        <img src="${img.src}" alt="${img.alt}" loading="lazy">
                        <div class="blog-card-overlay">
                            <h3 class="blog-card-title">${img.label}</h3>
                            <p class="blog-card-excerpt">${img.desc}</p>
                        </div>
                    </div>
                </div>
            `;
            this.track.appendChild(slide);
        });
    }
    
    duplicateSlides() {
        // Clone all slides and append to create seamless loop
        const slidesArray = Array.from(this.slides);
        
        slidesArray.forEach(slide => {
            const clone = slide.cloneNode(true);
            this.track.appendChild(clone);
        });
        
        console.log('✅ Slides duplicated for infinite loop');
    }
    
}

// Initialize blog carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.blogCarousel = new BlogCarousel();
    });
} else {
    window.blogCarousel = new BlogCarousel();
}

// ===== HERO CAROUSEL FUNCTIONALITY (OLD - REMOVED) =====

class HeroCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        if (!this.track || this.slides.length === 0) {
            console.warn('Carousel elements not found');
            return;
        }
        
        // Set first slide as active
        this.showSlide(0);
        
        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Start autoplay
        this.startAutoplay();
        
        console.log('✅ Hero Carousel initialized with', this.slides.length, 'slides');
    }
    
    showSlide(index) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Remove active class from all
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Add prev class to current slide (for fade out)
        if (this.slides[this.currentIndex]) {
            this.slides[this.currentIndex].classList.add('prev');
        }
        
        // Update index
        this.currentIndex = index;
        
        // Add active class to new slide
        if (this.slides[this.currentIndex]) {
            this.slides[this.currentIndex].classList.add('active');
        }
        
        // Update indicator
        if (this.indicators[this.currentIndex]) {
            this.indicators[this.currentIndex].classList.add('active');
        }
        
        // Reset transition lock after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1500); // Match CSS transition duration
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
        this.resetAutoplay();
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
        this.resetAutoplay();
    }
    
    goToSlide(index) {
        if (index === this.currentIndex) return;
        this.showSlide(index);
        this.resetAutoplay();
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    pauseAutoplay() {
        this.stopAutoplay();
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - prev slide
                this.prevSlide();
            }
        }
    }
    
    destroy() {
        this.stopAutoplay();
        // Remove event listeners if needed
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.heroCarousel = new HeroCarousel();
    });
} else {
    window.heroCarousel = new HeroCarousel();
}

// Pause carousel when page is hidden (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (window.heroCarousel) {
        if (document.hidden) {
            window.heroCarousel.stopAutoplay();
        } else {
            window.heroCarousel.startAutoplay();
        }
    }
});
