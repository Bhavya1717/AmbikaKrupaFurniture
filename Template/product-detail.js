// Product detail functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeProductDetail();
    initializeTabs();
    initializeImageGallery();
    initializeProductOptions();
    initializeQuantityControls();
    populateRelatedProducts();
});

function initializeProductDetail() {
    // Add product detail specific animations
    const productElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
    
    productElements.forEach((element, index) => {
        observer.observe(element);
    });
}

function initializeImageGallery() {
    const mainImage = document.getElementById('current-image');
    const imageThumbsList = document.querySelectorAll('.image-thumb');
    
    imageThumbsList.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            imageThumbsList.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
            
            // Update main image
            const newImageSrc = thumb.dataset.image;
            mainImage.src = newImageSrc;
            
            // Add zoom animation
            gsap.fromTo(mainImage, 
                { scale: 0.95, opacity: 0.7 },
                { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        });
    });
    
    // Image zoom functionality
    const mainImageContainer = document.getElementById('main-image');
    let isZoomed = false;
    
    mainImageContainer.addEventListener('click', () => {
        if (!isZoomed) {
            gsap.to(mainImage, { 
                scale: 2, 
                duration: 0.5, 
                ease: "power2.out",
                transformOrigin: "center center"
            });
            mainImageContainer.style.cursor = 'zoom-out';
            isZoomed = true;
        } else {
            gsap.to(mainImage, { 
                scale: 1, 
                duration: 0.5, 
                ease: "power2.out" 
            });
            mainImageContainer.style.cursor = 'zoom-in';
            isZoomed = false;
        }
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Animate tab content
            gsap.fromTo(`#${targetTab}`, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        });
    });
}

function initializeProductOptions() {
    // Finish options
    const finishOptions = document.querySelectorAll('.finish-option');
    finishOptions.forEach(option => {
        option.addEventListener('click', () => {
            finishOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Animate selection
            gsap.fromTo(option, 
                { scale: 0.95 },
                { scale: 1, duration: 0.2, ease: "power2.out" }
            );
            
            showToast(`Finish changed to ${option.dataset.finish}`, 'success');
        });
    });
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Animate selection
            gsap.fromTo(option, 
                { scale: 0.95 },
                { scale: 1, duration: 0.2, ease: "power2.out" }
            );
            
            showToast(`Size changed to ${option.dataset.size}`, 'success');
        });
    });
}

function initializeQuantityControls() {
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const quantityDisplay = document.getElementById('quantity');
    let quantity = 1;
    
    qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            animateQuantityChange();
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        animateQuantityChange();
    });
    
    function animateQuantityChange() {
        gsap.fromTo(quantityDisplay, 
            { scale: 1.2, color: '#8B4513' },
            { scale: 1, color: '#000', duration: 0.3, ease: "power2.out" }
        );
    }
}

function populateRelatedProducts() {
    const relatedProductsContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.gap-6');
    
    const relatedProducts = [
        {
            id: 1,
            name: "Comfort Dining Chair",
            price: "₹22,000",
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        {
            id: 2,
            name: "Executive Office Chair",
            price: "₹35,000",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        {
            id: 3,
            name: "Vintage Accent Chair",
            price: "₹28,000",
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        {
            id: 4,
            name: "Modern Lounge Chair",
            price: "₹32,000",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        }
    ];
    
    relatedProducts.forEach((product, index) => {
        const productCard = createRelatedProductCard(product, index);
        relatedProductsContainer.appendChild(productCard);
    });
    
    // Observe related products for animations
    setTimeout(() => {
        document.querySelectorAll('.related-product-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
}

function createRelatedProductCard(product, index) {
    const card = document.createElement('div');
    const animationClass = index % 2 === 0 ? 'fade-in-up' : 'scale-in';
    
    card.className = `related-product-card ${animationClass} bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer`;
    
    card.innerHTML = `
        <div class="h-48 bg-cover bg-center hover:scale-110 transition-transform duration-300" 
             style="background-image: url('${product.image}')"></div>
        <div class="p-4">
            <h3 class="font-semibold text-brown-primary mb-2 hover:text-brown-secondary transition-colors duration-300">
                ${product.name}
            </h3>
            <p class="text-brown-primary font-bold text-lg mb-3">${product.price}</p>
            <button class="btn-primary w-full">
                View Details
            </button>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showToast(`Viewing ${product.name}`, 'info');
        // In a real application, this would navigate to the product detail page
    });
    
    return card;
}

// Cart functionality
function addToCart() {
    const selectedFinish = document.querySelector('.finish-option.active').dataset.finish;
    const selectedSize = document.querySelector('.size-option.active').dataset.size;
    const quantity = document.getElementById('quantity').textContent;
    
    showToast(`Added ${quantity} Designer Chair(s) to cart (${selectedFinish}, ${selectedSize})`, 'success');
    
    // Animate add to cart button
    const addToCartBtn = document.querySelector('.btn-primary');
    gsap.to(addToCartBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
}

function buyNow() {
    showToast('Redirecting to checkout...', 'info');
    // In a real application, this would redirect to checkout
}

function requestCustomQuote() {
    showToast('Custom quote request sent! We will contact you within 24 hours.', 'success');
    // In a real application, this would open a form or send a request
}

// Add event listeners for action buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.querySelector('.btn-primary');
    const buyNowBtn = document.querySelector('.btn-outline');
    const customQuoteBtn = document.querySelector('.btn-outline.w-full');
    
    if (addToCartBtn) addToCartBtn.addEventListener('click', addToCart);
    if (buyNowBtn) buyNowBtn.addEventListener('click', buyNow);
    if (customQuoteBtn) customQuoteBtn.addEventListener('click', requestCustomQuote);
});

// Product option styles
const productOptionStyles = `
    .finish-option, .size-option {
        padding: 10px 16px;
        border: 2px solid #E5E7EB;
        background: white;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .finish-option:hover, .size-option:hover {
        border-color: var(--brown-primary);
        background-color: var(--brown-light);
    }
    
    .finish-option.active, .size-option.active {
        border-color: var(--brown-primary);
        background-color: var(--brown-primary);
        color: white;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    }
    
    .image-thumb {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .image-thumb:hover {
        border-color: var(--brown-primary);
        transform: scale(1.05);
    }
    
    .image-thumb.active {
        border-color: var(--brown-primary);
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    }
    
    .tab-button {
        padding: 12px 24px;
        border-bottom: 2px solid transparent;
        color: #6B7280;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .tab-button:hover {
        color: var(--brown-primary);
        border-bottom-color: var(--brown-primary);
    }
    
    .tab-button.active {
        color: var(--brown-primary);
        border-bottom-color: var(--brown-primary);
        font-weight: 600;
    }
    
    .tab-content {
        display: none;
    }
    
    .tab-content.active {
        display: block;
    }
    
    .btn-outline-icon {
        padding: 8px;
        border: 2px solid #E5E7EB;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
    }
    
    .btn-outline-icon:hover {
        border-color: var(--brown-primary);
        color: var(--brown-primary);
        transform: scale(1.1);
    }
`;

// Add product option styles to page
const productStyleSheet = document.createElement('style');
productStyleSheet.textContent = productOptionStyles;
document.head.appendChild(productStyleSheet);