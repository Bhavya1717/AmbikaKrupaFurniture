// Extended gallery data
const galleryProjects = [
    {
        id: 1,
        title: "Modern Master Bedroom Suite",
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Complete bedroom makeover with custom king-size bed, matching nightstands, and built-in wardrobes.",
        details: "This project involved creating a cohesive bedroom suite with premium oak wood and contemporary design elements. Features include hydraulic storage, soft-close drawers, and integrated LED lighting.",
        materials: "Solid Oak Wood, Veneer, Hardware",
        duration: "3 weeks",
        price: "₹1,50,000",
        featured: true
    },
    {
        id: 2,
        title: "Luxury Dining Room Set",
        category: "Dining",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Handcrafted 8-seater dining table with matching chairs and sideboard cabinet.",
        details: "Elegant dining set crafted from premium teak wood with traditional joinery techniques. The table features a live-edge design that showcases the natural wood grain.",
        materials: "Teak Wood, Brass Hardware, Fabric Upholstery",
        duration: "4 weeks",
        price: "₹2,25,000"
    },
    {
        id: 3,
        title: "Contemporary TV Console",
        category: "Living Room",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Minimalist TV unit with hidden cable management and storage compartments.",
        details: "Clean-lined entertainment center designed for modern living rooms. Features push-to-open doors, integrated cable routing, and ambient LED backlighting.",
        materials: "MDF, Laminate, Glass, LED Strips",
        duration: "2 weeks",
        price: "₹45,000",
        featured: true
    },
    {
        id: 4,
        title: "Executive Office Setup",
        category: "Office",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Complete office furniture including desk, chair, and storage solutions.",
        details: "Professional workspace designed for productivity and comfort. Includes ergonomic chair, spacious desk with wire management, and modular storage units.",
        materials: "Walnut Veneer, Steel Frame, Leather",
        duration: "2 weeks",
        price: "₹85,000"
    },
    {
        id: 5,
        title: "Children's Study & Play Area",
        category: "Kids",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Colorful and functional furniture set designed specifically for children.",
        details: "Safety-first design with rounded edges, non-toxic finishes, and adjustable height features. Includes study desk, storage bins, and reading nook.",
        materials: "Pine Wood, Non-toxic Paint, Safety Hardware",
        duration: "3 weeks",
        price: "₹65,000"
    },
    {
        id: 6,
        title: "Kitchen Island with Seating",
        category: "Kitchen",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Multi-functional kitchen island with granite top and bar seating.",
        details: "Central kitchen feature combining storage, workspace, and dining. Features granite countertop, soft-close drawers, and built-in electrical outlets.",
        materials: "Hardwood, Granite, Stainless Steel",
        duration: "3 weeks",
        price: "₹1,20,000",
        featured: true
    },
    {
        id: 7,
        title: "Living Room Entertainment Wall",
        category: "Living Room",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Floor-to-ceiling entertainment center with display shelves and storage.",
        details: "Comprehensive wall unit combining TV mounting, display space, and hidden storage. Features asymmetric design with mix of open and closed compartments.",
        materials: "Engineered Wood, Glass, Metal Accents",
        duration: "4 weeks",
        price: "₹95,000"
    },
    {
        id: 8,
        title: "Bedroom Wardrobe System",
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Built-in wardrobe with mirror doors and organized interior compartments.",
        details: "Maximizing bedroom storage with floor-to-ceiling wardrobes. Interior features adjustable shelves, hanging rods, and specialized compartments for accessories.",
        materials: "Plywood, Mirror, Aluminum Tracks",
        duration: "3 weeks",
        price: "₹75,000"
    },
    {
        id: 9,
        title: "Dining Room Display Cabinet",
        category: "Dining",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Elegant china cabinet with glass doors and interior lighting.",
        details: "Traditional dining room piece for displaying fine china and glassware. Features tempered glass shelves, soft-close hinges, and LED accent lighting.",
        materials: "Mahogany, Tempered Glass, LED Lights",
        duration: "2 weeks",
        price: "₹55,000"
    },
    {
        id: 10,
        title: "Home Office Library",
        category: "Office",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Floor-to-ceiling bookshelf with integrated desk and reading chair.",
        details: "Combining workspace and library in one cohesive design. Features ladder access to upper shelves, integrated task lighting, and comfortable reading nook.",
        materials: "Oak Wood, Brass Ladder, Leather Chair",
        duration: "5 weeks",
        price: "₹1,80,000"
    },
    {
        id: 11,
        title: "Kids Bunk Bed with Slide",
        category: "Kids",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Fun and safe bunk bed design with built-in slide and storage stairs.",
        details: "Playful bedroom solution that maximizes space while providing entertainment. Safety rails, non-slip surfaces, and storage stairs with toy compartments.",
        materials: "Pine Wood, Non-slip Coating, Safety Rails",
        duration: "4 weeks",
        price: "₹85,000"
    },
    {
        id: 12,
        title: "Kitchen Pantry Organization",
        category: "Kitchen",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Custom pantry with pull-out drawers and organized storage solutions.",
        details: "Maximizing kitchen storage efficiency with custom pantry design. Features pull-out drawers, spice racks, and adjustable shelving systems.",
        materials: "Plywood, Soft-close Hardware, Wire Baskets",
        duration: "2 weeks",
        price: "₹40,000"
    }
];

// Gallery functionality
let currentGalleryFilter = 'all';

function initializeGallery() {
    renderGallery(galleryProjects);
    setupGalleryFilterButtons();
}

function renderGallery(projectsToRender) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    
    projectsToRender.forEach((project, index) => {
        const galleryItem = createGalleryItem(project, index);
        grid.appendChild(galleryItem);
    });
    
    // Re-observe new elements for animations
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
            setupGalleryItemHover(item);
        });
    }, 100);
}

function createGalleryItem(project, index) {
    const item = document.createElement('div');
    const animationClass = index % 3 === 0 ? 'fade-in-left' : 
                          index % 3 === 1 ? 'fade-in-up' : 'fade-in-right';
    
    item.className = `gallery-item ${animationClass}`;
    item.onclick = () => openGalleryModal(project);
    
    item.innerHTML = `
        <div class="relative">
            <div class="gallery-image" style="background-image: url('${project.image}')"></div>
            ${project.featured ? '<div class="absolute top-4 left-4 bg-brown-primary text-white px-3 py-1 rounded-full text-sm font-medium">Featured</div>' : ''}
            <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                <i class="fas fa-eye mr-1"></i> View Details
            </div>
        </div>
        <div class="gallery-content">
            <h3 class="gallery-title">${project.title}</h3>
            <p class="text-gray-600 text-sm mb-3">${project.description}</p>
            <div class="flex justify-between items-center">
                <span class="inline-block bg-brown-primary text-white text-xs px-3 py-1 rounded-full">
                    ${project.category}
                </span>
                <span class="text-brown-primary font-semibold">${project.price}</span>
            </div>
        </div>
    `;
    
    return item;
}

function setupGalleryFilterButtons() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            currentGalleryFilter = category;
            
            // Filter projects
            const filteredProjects = category === 'all' ? 
                galleryProjects : galleryProjects.filter(project => project.category === category);
            
            // Animate out current items
            gsap.to('.gallery-item', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    renderGallery(filteredProjects);
                    // Animate in new items
                    gsap.from('.gallery-item', {
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

function setupGalleryItemHover(item) {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, { 
            y: -8, 
            scale: 1.02, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { 
            y: 0, 
            scale: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
}

// Gallery modal functions
function openGalleryModal(project) {
    const modal = document.getElementById('gallery-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <img src="${project.image}" alt="${project.title}" class="w-full h-80 object-cover rounded-lg">
            </div>
            <div>
                <h2 class="text-3xl font-bold text-brown-primary mb-4">${project.title}</h2>
                <div class="mb-4">
                    <span class="inline-block bg-brown-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                        ${project.category}
                    </span>
                    ${project.featured ? '<span class="inline-block bg-gold text-white px-4 py-2 rounded-full text-sm font-medium ml-2">Featured</span>' : ''}
                </div>
                
                <p class="text-gray-700 mb-6">${project.details}</p>
                
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-600">Materials:</span>
                        <span class="text-brown-primary">${project.materials}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-600">Duration:</span>
                        <span class="text-brown-primary">${project.duration}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-600">Investment:</span>
                        <span class="text-brown-primary font-bold text-xl">${project.price}</span>
                    </div>
                </div>
                
                <div class="mt-8 space-y-4">
                    <button onclick="requestSimilarProject('${project.title}')" class="btn-primary w-full">
                        <i class="fas fa-hammer mr-2"></i>
                        Request Similar Project
                    </button>
                    <div class="grid grid-cols-2 gap-4">
                        <a href="tel:+919876543210" class="btn-outline text-center">
                            <i class="fas fa-phone mr-2"></i>
                            Call Us
                        </a>
                        <a href="https://wa.me/919876543210?text=Hi%20CraftWood,%20I%20saw%20your%20${project.title}%20project%20and%20I'm%20interested" 
                           target="_blank" class="btn-secondary text-center">
                            <i class="fab fa-whatsapp mr-2"></i>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function requestSimilarProject(projectTitle) {
    showToast(`Request sent for project similar to "${projectTitle}"!`, 'success');
    closeGalleryModal();
    
    // You could integrate with a form or CRM here
    console.log('Similar project requested:', projectTitle);
}

// Close modal when clicking outside
document.getElementById('gallery-modal').addEventListener('click', (e) => {
    if (e.target.id === 'gallery-modal') {
        closeGalleryModal();
    }
});

// Gallery filter button styles
const galleryFilterBtnStyles = `
    .gallery-filter-btn {
        padding: 10px 20px;
        border: 2px solid var(--brown-primary);
        background: transparent;
        color: var(--brown-primary);
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .gallery-filter-btn:hover {
        background-color: var(--brown-primary);
        color: white;
        transform: translateY(-2px);
    }
    
    .gallery-filter-btn.active {
        background-color: var(--brown-primary);
        color: white;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    }
`;

// Add gallery filter button styles to page
const galleryStyleSheet = document.createElement('style');
galleryStyleSheet.textContent = galleryFilterBtnStyles;
document.head.appendChild(galleryStyleSheet);

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
});