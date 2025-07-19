// Component Import System
class ComponentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.initializeHeader();
        this.initializeSmoothScrolling();
        this.initializeAnimations();
    }

    async loadComponents() {
        const includeElements = document.querySelectorAll('[data-include]');

        for (const element of includeElements) {
            try {
                const response = await fetch(element.getAttribute('data-include'));
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                } else {
                    console.error(`Failed to load component: ${element.getAttribute('data-include')}`);
                }
            } catch (error) {
                console.error(`Error loading component: ${error}`);
            }
        }
    }

    initializeHeader() {
        const header = document.getElementById('site-header');
        const hamburger = header?.querySelector('.hamburger');
        const mobilePanel = header?.querySelector('.mobile-panel');
        const dropdownTriggers = header?.querySelectorAll('.dropdown-trigger');

        // Mobile menu toggle
        if (hamburger && mobilePanel) {
            hamburger.addEventListener('click', () => {
                const isOpen = hamburger.getAttribute('data-open') === 'true';
                hamburger.setAttribute('data-open', !isOpen);
                mobilePanel.setAttribute('data-open', !isOpen);
                document.body.classList.toggle('no-scroll', !isOpen);
            });

            // Close mobile menu when clicking overlay
            const overlay = mobilePanel.querySelector('.mobile-panel-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    hamburger.setAttribute('data-open', 'false');
                    mobilePanel.setAttribute('data-open', 'false');
                    document.body.classList.remove('no-scroll');
                });
            }
        }

        // Dropdown functionality
        if (dropdownTriggers) {
            dropdownTriggers.forEach(trigger => {
                const panel = trigger.nextElementSibling;

                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

                    // Close all other dropdowns
                    dropdownTriggers.forEach(otherTrigger => {
                        if (otherTrigger !== trigger) {
                            otherTrigger.setAttribute('aria-expanded', 'false');
                            otherTrigger.nextElementSibling.setAttribute('data-open', 'false');
                        }
                    });

                    // Toggle current dropdown
                    trigger.setAttribute('aria-expanded', !isExpanded);
                    panel.setAttribute('data-open', !isExpanded);
                });
            });

            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-dropdown')) {
                    dropdownTriggers.forEach(trigger => {
                        trigger.setAttribute('aria-expanded', 'false');
                        trigger.nextElementSibling.setAttribute('data-open', 'false');
                    });
                }
            });
        }

        // Header scroll effect
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            }
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    initializeSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.hero-section, .services-section, .products-section').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ComponentLoader());
} else {
    new ComponentLoader();
}