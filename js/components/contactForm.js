/**
 * Contact form handler
 * Manages form submission and validation
 */
export const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real implementation, we would send the form data to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you as soon as possible.`);
        
        // Clear the form
        contactForm.reset();
    });
};
