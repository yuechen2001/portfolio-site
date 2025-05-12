// Component loader for HTML fragments
document.addEventListener('DOMContentLoaded', function() {
    const components = [
        { id: 'navbar-container', path: 'components/html/navbar.html' },
        { id: 'hero-container', path: 'components/html/hero.html' },
        { id: 'about-container', path: 'components/html/about.html' },
        { id: 'experience-container', path: 'components/html/experience.html' },
        { id: 'skills-container', path: 'components/html/skills.html' },
        { id: 'projects-container', path: 'components/html/projects.html' },
        { id: 'footer-container', path: 'components/html/footer.html' },
        { id: 'contact-modal-container', path: 'components/html/contact-modal.html' }
    ];

    // Keep track of loaded components
    let loadedComponents = 0;
    
    // Function to initialize dynamic elements once all components are loaded
    function initializeDynamicElements() {
        // ---- Contact Modal Logic ----
        const modal = document.getElementById('contactModal');
        const contactBtn = document.getElementById('contactMeBtn');
        const closeBtn = document.getElementById('closeContactModal');
        const sendButton = document.getElementById('sendModalEmailBtn');
        const form = document.getElementById('contactFormModal');

        // Open modal
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }
        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        // Click outside to close
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        if (window.emailjs) {
            // Initialize EmailJS
            window.emailjs.init('rC6wk_uD_eRTjpJ4r');
            // Setup send button
            if (sendButton) {
                sendButton.addEventListener('click', function() {
                    // Get form data
                    const params = {
                        name: document.getElementById('modal-name').value,
                        email: document.getElementById('modal-email').value,
                        subject: document.getElementById('modal-subject').value,
                        message: document.getElementById('modal-message').value
                    };
                    // Show loading spinner
                    const spinner = document.getElementById('spinnerOverlay');
                    spinner.style.display = 'flex';
                    // Send email
                    window.emailjs.send('service_kyvqf4m', 'template_tx80pu9', params)
                        .then(function() {
                            // Hide spinner
                            spinner.style.display = 'none';
                            // Success
                            alert('Message sent successfully!');
                            form.reset();
                            modal.style.display = 'none';
                            document.body.style.overflow = '';
                        }, function(error) {
                            // Hide spinner
                            spinner.style.display = 'none';
                            // Error
                            alert('Failed to send message: ' + error.text);
                        });
                });
            }
        }; 
        // ---- End Contact Modal Logic ----

        function loadParticlesJS(callback) {
            if (typeof particlesJS !== 'undefined') {
                callback();
            } else {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
                script.onload = callback;
                document.head.appendChild(script);
            }
        }
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffffff" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": false },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                    "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "repulse" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    },
                    "modes": {
                        "repulse": { "distance": 100, "duration": 0.4 },
                        "push": { "particles_nb": 4 }
                    }
                },
                "retina_detect": true
            });
        }
        
        // Initialize rotating text
        const rotatingElement = document.getElementById('rotating-text');
        if (rotatingElement) {
            const roles = ['Software Engineer', 'Photographer', 'Casual Guitarist'];
            let currentRoleIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function typeEffect() {
                const currentRole = roles[currentRoleIndex];
                
                if (isDeleting) {
                    rotatingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typingSpeed = 50;
                } else {
                    rotatingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && currentCharIndex === currentRole.length) {
                    isDeleting = true;
                    typingSpeed = 1500;
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    typingSpeed = 500;
                }
                
                setTimeout(typeEffect, typingSpeed);
            }
            
            setTimeout(typeEffect, 1000);
        }
        
        // Initialize navigation features
        initializeNavigation();
        
        // Initialize scroll animations
        initializeScrollAnimations();
        
        // Initialize back to top functionality
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Initialize navigation functionality
    function initializeNavigation() {
        // Element references
        const navbar = document.getElementById('navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-links');
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                document.getElementById('backToTop')?.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                document.getElementById('backToTop')?.classList.remove('visible');
            }
        });
        
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
        updateActiveLink(); // Initialize on load
    }

    function hideScrollIndicatorAfterDelay() {
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 3000);
        }
    }

    // Initialize scroll animations
    function initializeScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded');
            return;
        }
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.hero-description', { opacity: 0, y: 20, duration: 0.6, delay: 0.4 })
            .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
            .from('.social-icons', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2');
            
        // Section headers animation
        const headers = document.querySelectorAll('.section-header');
        headers.forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out'
            });
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



    // Load each component into its container
    components.forEach(component => {
        fetch(component.path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${component.path}: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById(component.id);
                if (container) {
                    container.innerHTML = html;
                    
                    // Trigger any scripts in the loaded content
                    const scripts = container.querySelectorAll('script');
                    scripts.forEach(script => {
                        const newScript = document.createElement('script');
                        // Preserve type="module" if present
                        if (script.type) {
                            newScript.type = script.type;
                        }
                        if (script.src) {
                            newScript.src = script.src;
                        } else {
                            newScript.textContent = script.textContent;
                        }
                        document.head.appendChild(newScript);
                        script.remove();
                    });
                    
                    // Track loaded components
                    loadedComponents++;
                    
                    // Initialize dynamic elements when all components are loaded
                    if (loadedComponents === components.length) {
                        // Add a short delay to ensure DOM is fully updated
                        setTimeout(() => {
                            initializeDynamicElements();
                            hideScrollIndicatorAfterDelay();
                        }, 200);
                    }
                } else {
                    console.error(`Container not found for ${component.path}`);
                }
            })
            .catch(error => {
                console.error(`Error loading component ${component.path}:`, error);
            });
    });
});
