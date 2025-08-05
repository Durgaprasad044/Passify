// Passify Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    setupModalHandlers();
    setupButtonHandlers();
    setupNavigationHandlers();
    setupAnimations();
    setupFormHandlers();
}

// Modal Handlers
function setupModalHandlers() {
    const qrModal = document.getElementById('qrModal');
    const qrScanBtns = document.querySelectorAll('.qr-scan-btn');
    const closeQRBtn = document.getElementById('closeQR');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open QR Scanner Modal - handle multiple buttons
    qrScanBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('QR Scan button clicked');
                openModal(qrModal);
            });
        }
    });

    // Close QR Scanner Modal
    if (closeQRBtn) {
        closeQRBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(qrModal);
        });
    }

    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal(qrModal);
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && qrModal && !qrModal.classList.contains('hidden')) {
            closeModal(qrModal);
        }
    });
}

function openModal(modal) {
    if (modal) {
        console.log('Opening modal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
        }
        
        showNotification('QR Scanner opened successfully', 'success');
    }
}

function closeModal(modal) {
    if (modal && !modal.classList.contains('hidden')) {
        console.log('Closing modal');
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
        
        showNotification('QR Scanner closed', 'info');
    }
}

// Button Handlers
function setupButtonHandlers() {
    const checkInBtns = document.querySelectorAll('.check-in-btn');
    const loginBtns = document.querySelectorAll('.login-btn');
    const ctaButtons = document.querySelectorAll('.cta-actions .btn');

    // Check-In Buttons
    checkInBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleCheckIn();
            });
        }
    });

    // Login Buttons
    loginBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleLogin();
            });
        }
    });

    // CTA Buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Get Started')) {
                handleGetStarted();
            } else if (buttonText.includes('Watch Demo')) {
                handleWatchDemo();
            }
        });
    });

    // Setup button loading states with better handling
    setupButtonLoadingStates();
}

function handleCheckIn() {
    console.log('Check-in button clicked');
    showNotification('Opening Check-In Portal...', 'info');
    
    // Simulate navigation to check-in page with more realistic feedback
    setTimeout(() => {
        showNotification('✓ Check-In portal ready. You would be redirected to the visitor check-in form.', 'success');
    }, 1500);
}

function handleLogin() {
    console.log('Login button clicked');
    showNotification('Redirecting to Login Portal...', 'info');
    
    // Create a more realistic login flow simulation
    setTimeout(() => {
        showNotification('✓ Login portal ready. You would be redirected to the admin/staff login page.', 'success');
    }, 1500);
}

function handleGetStarted() {
    console.log('Get Started button clicked');
    showNotification('Initializing Passify Setup...', 'info');
    
    setTimeout(() => {
        showNotification('✓ Setup wizard ready. You would begin the Passify configuration process.', 'success');
    }, 1500);
}

function handleWatchDemo() {
    console.log('Watch Demo button clicked');
    showNotification('Loading Demo Video...', 'info');
    
    setTimeout(() => {
        showNotification('✓ Demo video ready. You would see a full product demonstration.', 'success');
    }, 1500);
}

function setupButtonLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        const originalHandler = button.onclick;
        
        button.addEventListener('click', function(e) {
            // Prevent double-clicks during loading
            if (this.classList.contains('loading')) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            
            // Add loading state
            const originalHTML = this.innerHTML;
            this.classList.add('loading');
            this.style.pointerEvents = 'none';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Remove loading state after action
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.pointerEvents = '';
                this.classList.remove('loading');
            }, 1600);
        });
    });
}

// Navigation Handlers
function setupNavigationHandlers() {
    const navLinks = document.querySelectorAll('.nav-link');
    const languageSelect = document.querySelector('.language-select');

    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            handleNavigation(linkText);
        });
    });

    // Language Selector
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            handleLanguageChange(this.value);
        });
    }

    // Smooth scroll for internal links
    setupSmoothScrolling();
}

function handleNavigation(linkText) {
    console.log('Navigation clicked:', linkText);
    switch (linkText) {
        case 'Have Appointment':
            showNotification('✓ Redirecting to appointment portal...', 'info');
            setTimeout(() => {
                showNotification('Appointment booking system would open here', 'success');
            }, 1000);
            break;
        case 'Been Here Before':
            showNotification('✓ Opening returning visitor portal...', 'info');
            setTimeout(() => {
                showNotification('Return visitor quick-access would open here', 'success');
            }, 1000);
            break;
        default:
            showNotification(`✓ Navigating to ${linkText}...`, 'info');
    }
}

function handleLanguageChange(language) {
    const languageNames = {
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French'
    };
    
    console.log('Language changed to:', language);
    showNotification(`Language changed to ${languageNames[language]}`, 'success');
    
    // Here you would typically implement actual language switching
    // For demo purposes, we'll just show the notification
}

function setupSmoothScrolling() {
    // Add smooth scrolling to any internal anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations
function setupAnimations() {
    setupScrollAnimations();
    setupHoverEffects();
    setupCounterAnimations();
}

function setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .tech-item, .benefit-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

function setupHoverEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    const techItems = document.querySelectorAll('.tech-item');

    // Feature cards hover effects
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });

    // Tech items hover effects
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

function setupCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, suffix = '') => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (suffix === '%') {
                element.textContent = Math.floor(current) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    };

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent.trim();
                
                if (text.includes('%')) {
                    const number = parseInt(text.replace('%', ''));
                    animateCounter(entry.target, number, '%');
                } else if (text === '24/7') {
                    // Special case for 24/7
                    return;
                } else {
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(entry.target, number);
                    }
                }
                
                counterObserver.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Form Handlers
function setupFormHandlers() {
    const languageSelect = document.querySelector('.language-select');
    
    if (languageSelect) {
        languageSelect.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        languageSelect.addEventListener('blur', function() {
            this.style.borderColor = 'var(--color-border)';
        });
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    const notificationStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-base)',
        padding: 'var(--space-16)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '1001',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-12)',
        minWidth: '300px',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        color: 'var(--color-text)',
        fontSize: 'var(--font-size-sm)'
    };

    Object.assign(notification.style, notificationStyles);

    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'error') {
        notification.style.borderLeftColor = 'var(--color-error)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'info') {
        notification.style.borderLeftColor = 'var(--color-primary)';
        notification.style.borderLeftWidth = '4px';
    }

    // Style the notification content
    const content = notification.querySelector('.notification-content');
    if (content) {
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.gap = 'var(--space-8)';
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Setup close button
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        const closeBtnStyles = {
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-sm)'
        };
        Object.assign(closeBtn.style, closeBtnStyles);
        
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': 
        default: return 'info-circle';
    }
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Enhanced error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Prevent form submission on demo buttons
document.addEventListener('submit', function(event) {
    event.preventDefault();
    showNotification('This is a demo - form submission prevented', 'info');
});

// Add some debugging
console.log('Passify landing page JavaScript loaded successfully!');

// Verify modal exists
setTimeout(() => {
    const qrModal = document.getElementById('qrModal');
    console.log('QR Modal found:', !!qrModal);
    
    const qrScanBtns = document.querySelectorAll('.qr-scan-btn');
    console.log('QR Scan buttons found:', qrScanBtns.length);
    
    const loginBtns = document.querySelectorAll('.login-btn');
    console.log('Login buttons found:', loginBtns.length);
}, 100);