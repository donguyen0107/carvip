// ===== REVIEWS/COMMENT SYSTEM =====

// Load reviews from localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Save review to localStorage
function saveReview(review) {
    const reviews = loadReviews();
    reviews.push({
        ...review,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Display reviews
function displayReviews() {
    const reviews = loadReviews();
    const container = document.getElementById('reviews-container');
    const countElement = document.getElementById('review-count');
    
    if (!container) return;
    
    countElement.textContent = reviews.length;
    
    if (reviews.length === 0) {
        container.innerHTML = '<p class="no-reviews">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>';
        return;
    }
    
    container.innerHTML = reviews.map(review => `
        <div class="review-card fade-in-up" data-review-id="${review.id}">
            <div class="review-header">
                <div class="review-author">
                    <div class="author-avatar">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=000000&color=fff" alt="${review.name}">
                    </div>
                    <div class="author-info">
                        <h4 class="author-name">${escapeHtml(review.name)}</h4>
                        <p class="review-date">${formatDate(review.timestamp)}</p>
                    </div>
                </div>
                <div class="review-actions">
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                    <button class="btn-delete-review" onclick="deleteReview(${review.id})" title="Xóa đánh giá">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <p class="review-text">${escapeHtml(review.comment)}</p>
        </div>
    `).join('');
}

// Delete review function
function deleteReview(reviewId) {
    const reviews = loadReviews();
    const review = reviews.find(r => r.id === reviewId);
    
    if (!review) {
        alert('Không tìm thấy đánh giá này!');
        return;
    }
    
    // Ask for email confirmation
    const email = prompt('Để xóa đánh giá này, vui lòng nhập email của bạn:');
    
    if (!email) {
        return; // User cancelled
    }
    
    // Check if email matches
    if (email.trim().toLowerCase() !== review.email.trim().toLowerCase()) {
        alert('Email không khớp! Bạn chỉ có thể xóa đánh giá của chính mình.');
        return;
    }
    
    // Confirm deletion
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa đánh giá này?');
    
    if (!confirmDelete) {
        return;
    }
    
    // Remove review from array
    const updatedReviews = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    
    // Refresh display
    displayReviews();
    
    showNotification('Đánh giá của bạn đã được xóa thành công!', 'success');
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hôm nay';
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày trước`;
    if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
    
    return date.toLocaleDateString('vi-VN');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle review form submission
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const rating = document.querySelector('input[name="rating"]:checked');
        const name = document.getElementById('review-name').value;
        const email = document.getElementById('review-email').value;
        const comment = document.getElementById('review-comment').value;
        
        if (!rating) {
            alert('Vui lòng chọn số sao đánh giá!');
            return;
        }
        
        // Create review object
        const review = {
            rating: parseInt(rating.value),
            name: name.trim(),
            email: email.trim(),
            comment: comment.trim()
        };
        
        // Show loading state
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Save review
        saveReview(review);
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Reset form
        reviewForm.reset();
        
        // Display updated reviews
        displayReviews();
        
        // Show success message
        showNotification('Cảm ơn bạn đã đánh giá! Ý kiến của bạn đã được ghi nhận.', 'success');
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Scroll to reviews list
        document.getElementById('reviews-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Star rating interaction
const starLabels = document.querySelectorAll('.star-rating label');
starLabels.forEach((label, index) => {
    label.addEventListener('mouseenter', () => {
        highlightStars(5 - index);
    });
});

const starRating = document.querySelector('.star-rating');
if (starRating) {
    starRating.addEventListener('mouseleave', () => {
        const checkedStar = document.querySelector('input[name="rating"]:checked');
        if (checkedStar) {
            highlightStars(parseInt(checkedStar.value));
        } else {
            highlightStars(0);
        }
    });
}

function highlightStars(count) {
    const labels = document.querySelectorAll('.star-rating label');
    labels.forEach((label, index) => {
        if (5 - index <= count) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
window.addEventListener('load', () => {
    displayReviews();
});

console.log('✅ Review system loaded successfully');
