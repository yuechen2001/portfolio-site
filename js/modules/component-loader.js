// Main component loader
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
                            // Import and initialize all modules
                            import('./contact-modal.js').then(module => module.initializeContactModal());
                            import('./navigation.js').then(module => module.initializeNavigation());
                            import('./animations.js').then(module => module.initializeScrollAnimations());
                            import('./ui-effects.js').then(module => {
                                module.hideScrollIndicatorAfterDelay();
                                module.initializeParticles();
                                module.initializeTypeEffect();
                            });
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
