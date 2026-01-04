// ===== BLOG CAROUSEL FUNCTIONALITY =====

class BlogCarousel {
    constructor() {
        this.track = document.querySelector('.blog-carousel-track');
        this.slides = document.querySelectorAll('.blog-carousel-slide');
        
        this.init();
    }
    
    init() {
        if (!this.track || this.slides.length === 0) {
            console.warn('Blog carousel elements not found');
            return;
        }
        
        // Duplicate slides for infinite loop
        this.duplicateSlides();
        
        console.log('✅ Blog Carousel initialized with infinite auto-scroll');
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
