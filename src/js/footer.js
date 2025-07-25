// Footer navigation logic for Sparktro

document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Get the current page path to determine the correct relative paths
    const currentPath = window.location.pathname;
    let basePath = '';

    // Check if we're in the pages directory
    if (currentPath.includes('/pages/') || currentPath.includes('pages/')) {
        // If we're in pages directory, go up one level
        basePath = '../';
    }

    // Map link text to page URLs with correct relative paths
    const linkMap = {
        'about us': basePath + 'pages/AboutUs.html',
        'contact us': basePath + 'pages/ContactUs.html',
        'terms & conditions': basePath + 'pages/TermsConditions.html',
        'privacy policy': basePath + 'pages/PrivacyPolicy.html',
        'services': basePath + 'pages/OurServices.html',
        'products': basePath + 'pages/Products.html',
        'blogs': basePath + 'pages/BlogPage2.html',
        'faqs': '#faq-list',
    };

    footer.addEventListener('click', function (e) {
        const target = e.target.closest('a');
        if (!target) return;
        const href = target.getAttribute('href');
        if (!href || href === '#' || href.toLowerCase().includes('faq')) {
            e.preventDefault();
            // Optionally show an alert or do nothing
            return;
        }
        // For all other links, navigate
        if (href.endsWith('.html')) {
            e.preventDefault();
            window.location.href = href;
        }
    });
}); 