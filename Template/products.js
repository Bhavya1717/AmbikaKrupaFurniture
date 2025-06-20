// Products data
const products = [
    // Beds
    {
        id: 1,
        name: "King Size Platform Bed",
        price: "₹35,000",
        originalPrice: "₹42,000",
        category: "beds",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Elegant king size platform bed with built-in storage and modern design",
        material: "Solid Oak Wood",
        finish: "Natural Stain",
        dimensions: "72\" x 84\" x 36\"",
        featured: true
    },
    {
        id: 2,
        name: "Queen Size Storage Bed",
        price: "₹28,000",
        category: "beds",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Space-saving queen bed with hydraulic storage system",
        material: "Engineered Wood",
        finish: "Walnut Finish",
        dimensions: "60\" x 80\" x 36\""
    },
    {
        id: 3,
        name: "Single Bed with Study Table",
        price: "₹25,000",
        category: "beds",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Perfect for kids room - bed with integrated study desk",
        material: "Pine Wood",
        finish: "White Paint",
        dimensions: "36\" x 72\" x 30\""
    },
    
    // Chairs
    {
        id: 4,
        name: "Executive Office Chair",
        price: "₹15,000",
        originalPrice: "₹18,000",
        category: "chairs",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Ergonomic office chair with premium leather upholstery",
        material: "Leather & Steel",
        finish: "Black Leather",
        dimensions: "26\" x 28\" x 45\"",
        featured: true
    },
    {
        id: 5,
        name: "Dining Chair Set (4 pcs)",
        price: "₹12,000",
        category: "chairs",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Set of 4 elegant dining chairs with cushioned seats",
        material: "Teak Wood",
        finish: "Honey Finish",
        dimensions: "18\" x 20\" x 36\" each"
    },
    {
        id: 6,
        name: "Accent Armchair",
        price: "₹8,000",
        category: "chairs",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Stylish accent chair perfect for living room corners",
        material: "Fabric & Wood",
        finish: "Grey Fabric",
        dimensions: "30\" x 32\" x 36\""
    },
    
    // TV Units
    {
        id: 7,
        name: "Modern TV Console",
        price: "₹22,000",
        originalPrice: "₹26,000",
        category: "tv-units",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Sleek TV console with cable management and storage",
        material: "MDF & Glass",
        finish: "High Gloss White",
        dimensions: "60\" x 16\" x 24\"",
        featured: true
    },
    {
        id: 8,
        name: "Wall Mounted TV Unit",
        price: "₹18,000",
        category: "tv-units",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Space-saving wall mounted entertainment center",
        material: "Plywood",
        finish: "Veneer Finish",
        dimensions: "72\" x 12\" x 48\""
    },
    {
        id: 9,
        name: "Traditional TV Cabinet",
        price: "₹15,000",
        category: "tv-units",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Classic TV cabinet with doors and drawers",
        material: "Solid Wood",
        finish: "Dark Walnut",
        dimensions: "54\" x 18\" x 30\""
    },
    
    // Custom Pieces
    {
        id: 10,
        name: "Custom Bookshelf",
        price: "₹35,000",
        category: "custom",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Floor-to-ceiling custom bookshelf with ladder",
        material: "Oak Wood",
        finish: "Natural Oil",
        dimensions: "Custom Sized"
    },
    {
        id: 11,
        name: "Kitchen Island",
        price: "₹45,000",
        category: "custom",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Custom kitchen island with storage and seating",
        material: "Granite & Wood",
        finish: "Mixed Finish",
        dimensions: "Custom Sized",
        featured: true
    },
    {
        id: 12,
        name: "Home Bar Unit",
        price: "₹40,000",
        category: "custom",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Elegant home bar with wine storage and lighting",
        material: "Teak & Glass",
        finish: "Rich Teak",
        dimensions: "Custom Sized"
    }
];

// Filter functionality
let currentFilter = 'all';

function initializeProducts() {
    renderProducts(products);
    setupFilterButtons();
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    productsToRender.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        grid.appendChild(productCard);
    });
    
    // Re-observe new elements for animations
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
            setupProductCardHover(card);
        });
    }, 100);
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    const animationClass = index % 3 === 0 ? 'fade-in-left' : 
                          index % 3 === 1 ? 'fade-in-up' : 'fade-in-right';
    
    card.className = `product-card ${animationClass}`;
    
    const discountPercent = product.originalPrice ? 
        Math.round((1 - parseInt(product.price.replace(/[₹,]/g, '')) / parseInt(product.originalPrice.replace(/[₹,]/g, ''))) * 100) : 0;
    
    card.innerHTML = `
        <div class="relative">
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            ${product.featured ? '<div class="absolute top-4 left-4 bg-brown-primary text-white px-3 py-1 rounded-full text-sm font-medium">Featured</div>' : ''}
            ${discountPercent > 0 ? `<div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">${discountPercent}% OFF</div>` : ''}
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <div class="flex items-center space-x-2 mb-2">
                <span class="product-price">${product.price}</span>
                ${product.originalPrice ? `<span class="text-gray-400 line-through text-sm">${product.originalPrice}</span>` : ''}
            </div>
            <p class="product-description mb-4">${product.description}</p>
            
            ${product.material || product.finish ? `
                <div class="mb-4 space-y-1">
                    ${product.material ? `<p class="text-sm text-gray-600"><span class="font-medium">Material:</span> ${product.material}</p>` : ''}
                    ${product.finish ? `<p class="text-sm text-gray-600"><span class="font-medium">Finish:</span> ${product.finish}</p>` : ''}
                    ${product.dimensions ? `<p class="text-sm text-gray-600"><span class="font-medium">Size:</span> ${product.dimensions}</p>` : ''}
                </div>
            ` : ''}
            
            <div class="flex gap-2 mb-4">
                <button class="flex-1 btn-primary text-sm py-2" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    Add to Cart
                </button>
                <button class="btn-outline text-sm py-2 px-4" onclick="toggleWishlist(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            
            <button class="btn-outline w-full text-sm py-2" onclick="customizeProduct(${product.id})">
                Customize This Design
            </button>
        </div>
    `;
    
    return card;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            currentFilter = category;
            
            // Filter products
            const filteredProducts = category === 'all' ? 
                products : products.filter(product => product.category === category);
            
            // Animate out current products
            gsap.to('.product-card', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    renderProducts(filteredProducts);
                    // Animate in new products
                    gsap.from('.product-card', {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.1,
                        delay: 0.2
                    });
                }
            });
        });
    });
}

function setupProductCardHover(card) {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            y: -8, 
            scale: 1.02, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
            y: 0, 
            scale: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
}

// Product interaction functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    showToast(`${product.name} added to cart!`, 'success');
    console.log('Added to cart:', product);
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    showToast(`${product.name} added to wishlist!`, 'info');
    console.log('Added to wishlist:', product);
}

function customizeProduct(productId) {
    const product = products.find(p => p.id === productId);
    console.log('Customizing product:', product);
    openCustomModal();
}

// Filter button styles
const filterBtnStyles = `
    .filter-btn {
        padding: 10px 20px;
        border: 2px solid var(--brown-primary);
        background: transparent;
        color: var(--brown-primary);
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
        background-color: var(--brown-primary);
        color: white;
        transform: translateY(-2px);
    }
    
    .filter-btn.active {
        background-color: var(--brown-primary);
        color: white;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    }
`;

// Add filter button styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = filterBtnStyles;
document.head.appendChild(styleSheet);

// Initialize products when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
});