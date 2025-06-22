// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const logoIcon = document.getElementById('logo-icon');
const customModal = document.getElementById('custom-modal');
const customForm = document.getElementById('custom-form');

// Navigation functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.style.padding = '8px 0';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '16px 0';
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Logo hover animation
logoIcon.addEventListener('mouseenter', () => {
    gsap.to(logoIcon, { rotation: 15, duration: 0.3 });
});

logoIcon.addEventListener('mouseleave', () => {
    gsap.to(logoIcon, { rotation: 0, duration: 0.3 });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animation elements
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#home .grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Gallery data and population
const galleryProjects = [
    {
        id: 1,
        title: "Modern Bedroom Set",
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Contemporary bedroom furniture with clean lines"
    },
    {
        id: 2,
        title: "Luxury Dining Table",
        category: "Dining",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Handcrafted dining table for family gatherings"
    },
    {
        id: 3,
        title: "Custom TV Console",
        category: "Living Room",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Minimalist TV unit with hidden storage"
    },
    {
        id: 4,
        title: "Office Workspace",
        category: "Office",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Ergonomic office furniture setup"
    },
    {
        id: 5,
        title: "Children's Study Desk",
        category: "Kids",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Colorful and functional study area"
    },
    {
        id: 6,
        title: "Kitchen Island",
        category: "Kitchen",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        description: "Custom kitchen island with seating"
    }
];

// Populate gallery
function populateGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    galleryProjects.forEach((project, index) => {
        const animationClass = index % 3 === 0 ? 'fade-in-left' : 
                             index % 3 === 1 ? 'fade-in-up' : 'fade-in-right';
        
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${animationClass}`;
        galleryItem.innerHTML = `
            <div class="gallery-image" style="background-image: url('${project.image}')"></div>
            <div class="gallery-content">
                <h3 class="gallery-title">${project.title}</h3>
                <p class="text-gray-600">${project.description}</p>
                <span class="inline-block bg-brown-primary text-white text-sm px-3 py-1 rounded-full mt-2">
                    ${project.category}
                </span>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openGalleryModal(project);
        });
        
        galleryGrid.appendChild(galleryItem);
        observer.observe(galleryItem);
    });
}

// Gallery modal functionality
function openGalleryModal(project) {
    alert(`Viewing: ${project.title}\n\nCategory: ${project.category}\nDescription: ${project.description}\n\nContact us for similar projects!`);
}

// Custom furniture modal functions
function openCustomModal() {
    customModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCustomModal() {
    customModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
customModal.addEventListener('click', (e) => {
    if (e.target === customModal) {
        closeCustomModal();
    }
});

// Custom form submission
customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(customForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    showToast('Thank you for your inquiry! We will contact you soon.', 'success');
    
    // Reset form and close modal
    customForm.reset();
    closeCustomModal();
    
    console.log('Form submitted:', data);
});

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg text-white font-medium ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'transform 0.3s ease';
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// GSAP Animations
gsap.timeline()
    .from("#home h1", { 
        duration: 1, 
        y: 50, 
        opacity: 0, 
        ease: "power3.out" 
    })
    .from("#home p", { 
        duration: 1, 
        y: 30, 
        opacity: 0, 
        ease: "power3.out" 
    }, "-=0.5")
    .from("#home .btn-primary, #home .btn-secondary", { 
        duration: 0.8, 
        y: 30, 
        opacity: 0, 
        stagger: 0.2, 
        ease: "power3.out" 
    }, "-=0.3");

// Product cards hover animations
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            y: -8, 
            scale: 1.05, 
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
});

// Gallery items hover animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, { 
                    y: -8, 
                    scale: 1.05, 
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
        });
    }, 500);
});

// Contact cards hover animations
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            y: -8, 
            scale: 1.05, 
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
});

// Button hover animations
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { 
            y: -2, 
            scale: 1.05, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { 
            y: 0, 
            scale: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();
    
    // Add loading animation
    gsap.from("body", { 
        duration: 0.5, 
        opacity: 0, 
        ease: "power2.out" 
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && customModal.style.display === 'block') {
        closeCustomModal();
    }
});

// Performance optimization - Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// WhatsApp and Phone click tracking
document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"]').forEach(link => {
    link.addEventListener('click', () => {
        const type = link.href.startsWith('tel:') ? 'phone' : 'whatsapp';
        console.log(`Contact initiated via ${type}`);
        
        // You can add analytics tracking here
        // gtag('event', 'contact', { method: type });
    });
});