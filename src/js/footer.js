// Footer navigation logic for Sparktro

document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Map link text to page URLs
    const linkMap = {
        'about us': './pages/AboutUs.html',
        'contact us': './pages/ContactUs.html',
        'terms & conditions': './pages/TermsConditions.html',
        'privacy policy': './pages/PrivacyPolicy.html',
        'services': './pages/OurServices.html',
        'products': './pages/Products.html',
        'blogs': './pages/BlogPage2.html',
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