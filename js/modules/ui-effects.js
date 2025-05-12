// UI effects and animations
export function hideScrollIndicatorAfterDelay() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.classList.add('fade-out');
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 800); // Match the CSS transition duration
        }, 4000);
    }
}

export function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        loadParticles();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = loadParticles;
        document.head.appendChild(script);
    }
}

function loadParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

export function initializeTypeEffect() {
    const rotatingText = document.getElementById('rotating-text');
    if (!rotatingText) return;
    
    const roles = [
        'Software Engineer',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast',
        'Game Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            rotatingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            rotatingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect
    typeEffect();
}
