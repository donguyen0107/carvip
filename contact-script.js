// ===== CONTACT PAGE FUNCTIONALITY =====

const contactForm = document.getElementById('contact-form');
const faqItems = document.querySelectorAll('.faq-item');

// ===== CONTACT FORM SUBMISSION =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Show success modal
    showModal();
    
    // Reset form
    contactForm.reset();
    
    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
});

// ===== FAQ ACCORDION =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ===== MODAL FUNCTIONS =====
function showModal() {
    const modal = document.getElementById('success-modal');
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

// ===== ADD STYLES FOR CONTACT PAGE =====
const style = document.createElement('style');
style.textContent = `
    .contact-hero {
        padding: 8rem 0 3rem;
        background: var(--color-primary);
        text-align: center;
    }
    
    .contact-hero-title {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: var(--font-weight-bold);
        margin-bottom: 1rem;
        color: var(--color-white);
    }
    
    .contact-hero-description {
        font-size: 1.125rem;
        color: var(--color-gray);
    }
    
    .contact-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-xl);
    }
    
    .contact-info-title {
        font-size: 2rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-sm);
        color: var(--color-white);
    }
    
    .contact-info-description {
        color: var(--color-gray);
        margin-bottom: var(--spacing-md);
        line-height: 1.8;
    }
    
    .contact-cards {
        display: grid;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
    }
    
    .contact-card {
        display: flex;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
        background-color: var(--color-secondary);
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        border: 2px solid var(--color-border);
        transition: var(--transition-base);
    }
    
    .contact-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 16px rgba(255, 255, 255, 0.1);
        border-color: var(--color-accent);
    }
    
    .contact-card-icon {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--gradient-primary);
        color: var(--color-white);
        border-radius: var(--radius-md);
        font-size: 1.5rem;
        flex-shrink: 0;
    }
    
    .contact-card-title {
        font-size: 1.125rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: 0.5rem;
        color: var(--color-white);
    }
    
    .contact-card-link {
        display: block;
        color: var(--color-gray);
        margin-bottom: 0.25rem;
        transition: var(--transition-base);
    }
    
    .contact-card-link:hover {
        color: var(--color-white);
        padding-left: 0.5rem;
    }
    
    .contact-card-text {
        color: var(--color-gray);
        margin-bottom: 0.25rem;
    }
    
    .contact-social {
        padding: var(--spacing-md);
        background-color: var(--color-accent);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
    }
    
    .contact-social-title {
        font-size: 1.125rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-sm);
        color: var(--color-white);
    }
    
    .social-links {
        display: flex;
        gap: var(--spacing-sm);
    }
    
    .social-links .social-link {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-accent);
        border-radius: 50%;
        border: 1px solid var(--color-border);
        font-size: 1.25rem;
        transition: var(--transition-base);
    }
    
    .social-links .social-link:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 16px rgba(255, 255, 255, 0.1);
        background-color: var(--color-white);
        color: var(--color-primary);
    }
    
    .social-links .facebook { color: #1877f2; }
    .social-links .instagram { color: #e4405f; }
    .social-links .youtube { color: #ff0000; }
    .social-links .zalo { color: #0068ff; }
    
    .contact-form-wrapper {
        background-color: var(--color-secondary);
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.05);
        border: 1px solid var(--color-border);
    }
    
    .contact-form-title {
        font-size: 2rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-xs);
        color: var(--color-white);
    }
    
    .contact-form-description {
        color: var(--color-gray);
        margin-bottom: var(--spacing-md);
    }
    
    .form-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
    
    .map-section {
        margin-top: var(--spacing-xl);
    }
    
    .map-container {
        width: 100%;
        height: 450px;
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
    }
    
    .faq-container {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .faq-item {
        margin-bottom: var(--spacing-sm);
        background-color: var(--color-secondary);
        border-radius: var(--radius-lg);
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.05);
        border: 1px solid var(--color-border);
        overflow: hidden;
    }
    
    .faq-question {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        background-color: transparent;
        border: none;
        text-align: left;
        font-size: 1.125rem;
        font-weight: var(--font-weight-medium);
        color: var(--color-white);
        cursor: pointer;
        transition: var(--transition-base);
    }
    
    .faq-question:hover {
        background-color: var(--color-accent);
    }
    
    .faq-question i {
        transition: transform var(--transition-base);
    }
    
    .faq-item.active .faq-question i {
        transform: rotate(180deg);
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .faq-answer p {
        padding: 0 var(--spacing-md) var(--spacing-md);
        color: var(--color-gray);
        line-height: 1.8;
    }
    
    @media (max-width: 968px) {
        .contact-container {
            grid-template-columns: 1fr;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Contact page loaded successfully');
