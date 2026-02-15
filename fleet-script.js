// ===== FLEET PAGE FUNCTIONALITY =====

const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

// ===== SEARCH FUNCTIONALITY =====
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterCars(searchTerm, getCurrentFilter());
});

// ===== FILTER FUNCTIONALITY =====
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter cars
        const filter = button.dataset.filter;
        const searchTerm = searchInput.value.toLowerCase();
        filterCars(searchTerm, filter);
    });
});

// ===== FILTER CARS FUNCTION =====
function filterCars(searchTerm, category) {
    carCards.forEach(card => {
        const carName = card.querySelector('.car-name').textContent.toLowerCase();
        const carDescription = card.querySelector('.car-description').textContent.toLowerCase();
        const carCategory = card.dataset.category;
        
        const matchesSearch = carName.includes(searchTerm) || carDescription.includes(searchTerm);
        const matchesCategory = category === 'all' || carCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== GET CURRENT FILTER =====
function getCurrentFilter() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.dataset.filter : 'all';
}

// ===== ADD STYLES FOR FLEET PAGE =====
const style = document.createElement('style');
style.textContent = `
    .fleet-hero {
        padding: 8rem 0 3rem;
        background: var(--color-primary);
        text-align: center;
    }
    
    .fleet-hero-title {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: var(--font-weight-bold);
        margin-bottom: 1rem;
        color: var(--color-white);
    }
    
    .fleet-hero-description {
        font-size: 1.125rem;
        color: var(--color-gray);
    }
    
    .fleet-filter {
        padding: 2rem 0;
        background-color: var(--color-secondary);
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid var(--color-border);
        position: sticky;
        top: 80px;
        z-index: 100;
    }
    
    .filter-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-md);
        flex-wrap: wrap;
    }
    
    .search-box {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        flex: 1;
        max-width: 400px;
        padding: 0.75rem 1rem;
        background-color: var(--color-accent);
        border-radius: var(--radius-md);
        border: 2px solid var(--color-border);
        transition: var(--transition-base);
    }
    
    .search-box:focus-within {
        border-color: var(--color-white);
    }
    
    .search-box i {
        color: var(--color-gray);
    }
    
    .search-box input {
        flex: 1;
        border: none;
        background: none;
        outline: none;
        font-size: 1rem;
        color: var(--color-white);
    }
    
    .filter-buttons {
        display: flex;
        gap: var(--spacing-xs);
    }
    
    .filter-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--color-border);
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: var(--radius-md);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: var(--transition-base);
    }
    
    .filter-btn:hover {
        border-color: var(--color-white);
        background-color: var(--color-secondary);
    }
    
    .filter-btn.active {
        background-color: var(--color-white);
        color: var(--color-primary);
        border-color: var(--color-white);
    }
    
    .car-specs {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin: var(--spacing-sm) 0;
    }
    
    .spec-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background-color: var(--color-accent);
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        color: var(--color-gray);
        border: 1px solid var(--color-border);
    }
    
    .spec-item i {
        color: var(--color-white);
    }
    
    @media (max-width: 768px) {
        .filter-bar {
            flex-direction: column;
        }
        
        .search-box {
            max-width: 100%;
        }
        
        .filter-buttons {
            width: 100%;
            justify-content: center;
        }
        
        .filter-btn {
            flex: 1;
            padding: 0.75rem 1rem;
        }
    }
`;
document.head.appendChild(style);

// ===== MAKE CAR CARDS CLICKABLE =====
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

console.log('✅ Fleet page loaded successfully');
