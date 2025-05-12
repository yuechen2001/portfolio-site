/**
 * Navigation functionality
 * Handles navbar behavior, smooth scrolling, and active link highlighting
 */
export const initNavigation = () => {
    // Element references
    const navbar = document.getElementById('navbar');
    const backToTopButton = document.getElementById('backToTop');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (backToTopButton) backToTopButton.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            if (backToTopButton) backToTopButton.classList.remove('visible');
        }
    });
    
    // Back to top button click handler
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Special case for back to top button
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            
            // Check if we're in this section (with 100px buffer for better UX)
            if (scrollY >= sectionTop - navbarHeight - 100 && scrollY < sectionBottom - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // If at the very top of the page and no section is active, set home as active
        if (scrollY < 100 && current === '') {
            current = 'home';
        }
        
        // Update active class on nav links
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
};
