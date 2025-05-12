/**
 * Tilt effect
 * Handles the 3D hover effect for project cards
 */
export const initTiltEffect = () => {
    if (typeof VanillaTilt === 'undefined') {
        console.warn('VanillaTilt library not loaded');
        return;
    }
    
    const projectCards = document.querySelectorAll(".project-card");
    
    if (projectCards.length > 0) {
        VanillaTilt.init(projectCards, {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.02,
            perspective: 1000,
            transition: true
        });
    }
};
