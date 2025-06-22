// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    // Handle contact form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        if (!data.name || !data.phone || !data.message) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate form submission
        showToast('Thank you for your message! We will contact you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        console.log('Contact form submitted:', data);
        
        // You can integrate with a backend service here
        // Example: sendContactForm(data);
    });
    
    // FAQ functionality
    initializeFAQ();
});

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('i');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('i');
                
                if (otherItem !== item) {
                    otherAnswer.classList.add('hidden');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                
                // Animate the answer
                gsap.from(answer, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Phone number validation
function validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form field validation on blur
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = '#EF4444';
            showToast('Please enter a valid phone number', 'error');
        } else {
            phoneInput.style.borderColor = '#E5E7EB';
        }
    });
    
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#EF4444';
            showToast('Please enter a valid email address', 'error');
        } else {
            emailInput.style.borderColor = '#E5E7EB';
        }
    });
});

// Auto-format phone number
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('91')) {
        value = '+' + value;
    } else if (value.length === 10) {
        value = '+91 ' + value;
    }
    
    e.target.value = value;
});

// Contact tracking
function trackContact(method) {
    console.log(`Contact initiated via ${method}`);
    // You can add analytics tracking here
    // gtag('event', 'contact', { method: method });
}

// Add contact tracking to all contact links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => trackContact('phone'));
    });
    
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.addEventListener('click', () => trackContact('whatsapp'));
    });
});

// Showroom visit scheduler
function scheduleShowroomVisit() {
    const message = "Hi CraftWood, I'd like to schedule a visit to your showroom. When would be a good time?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    trackContact('showroom_visit');
}

// Add click handlers for showroom visit buttons
document.addEventListener('DOMContentLoaded', () => {
    const showroomButtons = document.querySelectorAll('a[href*="schedule"]');
    showroomButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            scheduleShowroomVisit();
        });
    });
});