// Scroll-triggered animation utility
export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with the animate-on-scroll class
  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
  });
}

// Enhanced scroll animations for specific elements
export function initEnhancedAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '-50px', // Start animation slightly before element comes into view
    threshold: [0.1, 0.3, 0.6],
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        // Add different animation classes based on intersection ratio
        if (entry.intersectionRatio > 0.5) {
          element.classList.add('animate-in-fully');
        } else {
          element.classList.add('animate-in-partial');
        }

        // Remove initial delay class for immediate animation
        element.style.animationDelay = '0ms';
      }
    });
  }, observerOptions);

  document.addEventListener('DOMContentLoaded', () => {
    const enhancedElements = document.querySelectorAll('.animate-enhanced');
    enhancedElements.forEach((el) => observer.observe(el));
  });
}

// Parallax scrolling effect
export function initParallaxEffects() {
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

// Parallax scrolling effect for hero background
export function initParallaxEffects() {
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const heroOrbs = document.querySelectorAll('.animate-float');

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    // Enhanced parallax for hero background orbs
    heroOrbs.forEach((element, index) => {
      const speed = 0.2 + (index * 0.1);
      const yPos = -(scrolled * speed);
      const xPos = Math.sin(scrolled * 0.001 + index) * 20;
      element.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

// Interactive cursor effect for hero section
export function initHeroCursorEffects() {
  const heroSection = document.querySelector('section');
  if (!heroSection) return;

  heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = heroSection.getBoundingClientRect();

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    // Update floating orbs based on cursor position
    const orbs = heroSection.querySelectorAll('.animate-float');
    orbs.forEach((orb, index) => {
      const intensity = (index + 1) * 10;
      const xOffset = (x - 0.5) * intensity;
      const yOffset = (y - 0.5) * intensity;

      orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  });
}

// Smooth scroll for anchor links
export function initSmoothScroll() {
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
}

// Initialize all animations
export function initAnimations() {
  initScrollAnimations();
  initEnhancedAnimations();
  initParallaxEffects();
  initHeroCursorEffects();
  initSmoothScroll();
}