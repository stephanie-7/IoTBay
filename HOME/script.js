document.addEventListener('DOMContentLoaded', (event) => {
    const buyNowButtons = document.querySelectorAll('.btn');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Thank you for your interest! This feature is coming soon.');
        });
    });

    // Simple search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const products = document.querySelectorAll('.col-4');

    searchInput.addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector('h4').textContent.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
});
