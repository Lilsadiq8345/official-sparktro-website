// Sparktro Website Utilities

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const button = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.icon');

        if (button && content && icon) {
            button.addEventListener('click', function () {
                const isOpen = item.getAttribute('data-open') === 'true';

                // Close all FAQ items
                faqItems.forEach((otherItem) => {
                    otherItem.setAttribute('data-open', 'false');
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.icon');

                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.textContent = '+';
                    otherItem.classList.remove('bg-[rgba(10,151,176,0.10)]', 'border-hannan-primary-2');
                    otherItem.classList.add('bg-hannan-white', 'border-hannan-border-2');
                    const otherButton = otherItem.querySelector('button');
                    if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                });

                // Open clicked item if it wasn't open
                if (!isOpen) {
                    item.setAttribute('data-open', 'true');
                    content.classList.remove('hidden');
                    icon.textContent = '–';
                    item.classList.add('bg-[rgba(10,151,176,0.10)]', 'border-hannan-primary-2');
                    item.classList.remove('bg-hannan-white', 'border-hannan-border-2');
                    button.setAttribute('aria-expanded', 'true');
                }
            });

            // Add keyboard support
            button.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        }
    });
}

// Form submission handler
function initializeForms() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
            alert('Thank you for your message! We will get back to you soon.');
        });
    }

    // Newsletter subscription
    const newsletterButton = document.querySelector('footer button');
    const newsletterInput = document.querySelector('footer input[type="email"]');

    if (newsletterButton && newsletterInput) {
        newsletterButton.addEventListener('click', () => {
            const email = newsletterInput.value;
            if (email) {
                console.log('Newsletter subscription:', email);
                alert('Thank you for subscribing to our newsletter!');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Reading progress bar for blog pages
function initializeReadingProgress() {
    const readingProgress = document.getElementById('readingProgress');
    if (readingProgress) {
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            readingProgress.style.width = scrolled + '%';
        });
    }
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }
}

// Intersection Observer for animations
function initializeAnimations() {
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

    // Observe all blog content sections
    document.querySelectorAll('.blog-content').forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'all 0.6s ease-out';
        observer.observe(content);
    });
}

// Share functionality
function initializeShareButtons() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Add share functionality here
            console.log('Share button clicked');
        });
    });
}

// Smooth scroll for navigation
function initializeSmoothScroll() {
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

// Initialize all utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeFAQ();
    initializeForms();
    initializeReadingProgress();
    initializeHeaderScroll();
    initializeAnimations();
    initializeShareButtons();
    initializeSmoothScroll();
});

// Export functions for use in other files
window.SparktroUtils = {
    initializeFAQ,
    initializeForms,
    initializeReadingProgress,
    initializeHeaderScroll,
    initializeAnimations,
    initializeShareButtons,
    initializeSmoothScroll
}; 