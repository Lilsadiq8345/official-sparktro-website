// Component Import System
class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    // Load a component from a file
    async loadComponent(path) {
        if (this.loadedComponents.has(path)) {
            return this.components.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${path}`);
            }

            const html = await response.text();
            this.components.set(path, html);
            this.loadedComponents.add(path);
            return html;
        } catch (error) {
            console.error(`Error loading component ${path}:`, error);
            return `<div class="p-4 bg-red-100 text-red-700 rounded">Error loading component: ${path}</div>`;
        }
    }

    // Replace all data-include elements with their component content
    async loadAllComponents() {
        const includeElements = document.querySelectorAll('[data-include]');

        for (const element of includeElements) {
            const componentPath = element.getAttribute('data-include');
            const html = await this.loadComponent(componentPath);

            // Create a temporary container to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // Replace the placeholder with the actual component
            element.replaceWith(...temp.children);
        }
    }

    // Load a specific component into an element
    async loadComponentInto(element, path) {
        const html = await this.loadComponent(path);
        element.innerHTML = html;
    }
}

// Initialize component loader
const componentLoader = new ComponentLoader();

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await componentLoader.loadAllComponents();

    // Initialize any JavaScript functionality after components are loaded
    initializeApp();
});

// Initialize app functionality
function initializeApp() {
    // Mobile Menu Functionality
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const closeButtons = document.querySelectorAll('[data-close]');
    const closeOverlay = document.querySelector('[data-close-overlay]');

    // Toggle mobile menu
    mobileMenuButton?.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mobileMenuPanel.classList.toggle('hidden');
        document.body.classList.toggle('mobile-menu-open');
    });

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuButton?.setAttribute('aria-expanded', 'false');
        mobileMenuPanel?.classList.add('hidden');
        document.body.classList.remove('mobile-menu-open');
    }

    // Close on overlay click
    closeOverlay?.addEventListener('click', closeMobileMenu);

    // Close on close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', closeMobileMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !mobileMenuPanel?.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });

    // Desktop dropdown functionality
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');

    dropdownTriggers.forEach(trigger => {
        const dropdownId = trigger.getAttribute('data-dropdown-trigger');
        const dropdown = document.querySelector(`[data-dropdown="${dropdownId}"]`);
        const caret = trigger.querySelector('[data-caret]');

        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other dropdowns
            dropdownTriggers.forEach(otherTrigger => {
                if (otherTrigger !== this) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherCaret = otherTrigger.querySelector('[data-caret]');
                    otherCaret?.classList.remove('rotate-180');
                }
            });

            // Toggle current dropdown
            this.setAttribute('aria-expanded', !isExpanded);
            caret?.classList.toggle('rotate-180');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-group')) {
            dropdownTriggers.forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
                const caret = trigger.querySelector('[data-caret]');
                caret?.classList.remove('rotate-180');
            });
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('[data-component="site-header"]');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header?.classList.add('bg-black/95', 'backdrop-blur-sm');
        } else {
            header?.classList.remove('bg-black/95', 'backdrop-blur-sm');
        }

        lastScrollY = currentScrollY;
    });
}

// Export for use in other modules
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;