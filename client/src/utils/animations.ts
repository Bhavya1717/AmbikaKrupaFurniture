// Enhanced scroll animations utility
export function initializeScrollAnimations() {
  // Create intersection observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe all animation elements
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
  );
  
  animatedElements.forEach((el) => {
    // Ensure elements in viewport get animated with a small delay for smooth fade-in
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      // Add small delay to allow fade-in transition for dynamic content
      setTimeout(() => {
        el.classList.add('animate');
      }, 100);
    } else {
      observer.observe(el);
    }
  });

  // Fallback: Auto-animate elements after 2 seconds if not already animated
  setTimeout(() => {
    animatedElements.forEach((el) => {
      if (!el.classList.contains('animate')) {
        el.classList.add('animate');
      }
    });
  }, 2000);
}

// Enhanced hover effects for interactive elements
export function enhanceHoverEffects() {
  const interactiveElements = document.querySelectorAll(
    '.hover-lift, [data-hover="lift"]'
  );
  
  interactiveElements.forEach((el) => {
    const element = el as HTMLElement;
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
    });
  });
}

// Initialize on DOM load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    enhanceHoverEffects();
  });
  
  // Also initialize when content changes (for SPA navigation)
  window.addEventListener('popstate', () => {
    setTimeout(() => {
      initializeScrollAnimations();
      enhanceHoverEffects();
    }, 100);
  });
}