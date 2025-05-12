/**
 * Rotating text animation
 * Handles the typing and deleting effect for multiple roles in the hero section
 */
export const initRotatingText = () => {
    const rotatingElement = document.getElementById('rotating-text');
    
    if (!rotatingElement) return;
    
    const roles = [
        'Software Engineer',
        'Photographer',
        'Casual Guitarist'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            // Deleting text
            rotatingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            rotatingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // If completed typing the current role
        if (!isDeleting && currentCharIndex === currentRole.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1500; // Wait before starting to delete
        } 
        // If completed deleting
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length; // Move to next role
            typingSpeed = 500; // Pause before typing the next role
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect with a small delay
    setTimeout(typeEffect, 1000);
};
