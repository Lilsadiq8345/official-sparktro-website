document.addEventListener('DOMContentLoaded', () => {
    // Function to load HTML content from a given URL into a specific element ID
    function loadHTML(url, elementId) {
        fetch(url)
            .then(response => {
                // Check if the network response was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text(); // Get the response body as text
            })
            .then(html => {
                // Find the placeholder element by its ID
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    // Insert the fetched HTML into the placeholder
                    placeholder.innerHTML = html;
                } else {
                    console.error(`Placeholder element with ID "${elementId}" not found.`);
                }
            })
            .catch(error => {
                // Log any errors during the fetch or DOM manipulation
                console.error(`Could not load ${url}:`, error);
            });
    }

    // Get the current page path to determine the correct relative paths
    const currentPath = window.location.pathname;
    let headerPath, footerPath;

    // Check if we're in the pages directory
    if (currentPath.includes('/pages/') || currentPath.includes('pages/')) {
        // If we're in pages directory, go up one level to reach components
        headerPath = '../components/header.html';
        footerPath = '../components/footer.html';
    } else {
        // If we're in root directory
        headerPath = '/components/header.html';
        footerPath = '/components/footer.html';
    }

    // Call the loadHTML function for your header and footer
    loadHTML(headerPath, 'header-placeholder');
    loadHTML(footerPath, 'footer-placeholder');
});