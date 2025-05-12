/**
 * Main JavaScript file
 * Imports and initializes all components
 */
import { initParticles } from './components/particles.js';
import { initRotatingText } from './components/rotatingText.js';
import { initNavigation } from './components/navigation.js';
import { initAnimations } from './components/animations.js';
import { initTiltEffect } from './components/tiltEffect.js';
import { initContactForm } from './components/contactForm.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initRotatingText();
    initNavigation();
    initAnimations();
    initTiltEffect();
    initContactForm();
    
    console.log('Portfolio initialized successfully');
});
