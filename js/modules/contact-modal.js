// Contact modal functionality
export function initializeContactModal() {
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
    }
}
