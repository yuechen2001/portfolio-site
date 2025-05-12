// Scroll animations using GSAP
export function initializeScrollAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero .subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero .btn', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    gsap.from('.social-icons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    // About section animations
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true
            },
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out'
        });
    });
    
    // Skill items animations
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true
            },
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: function() {
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar) {
                    const level = progressBar.getAttribute('data-skill-level');
                    progressBar.style.width = `${level}%`;
                }
            }
        });
    });
    
    // Project cards animations
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}
