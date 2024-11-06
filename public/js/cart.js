
async function addToCart(productId, productPrice) {
    const quantity = 1; 

    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, price: productPrice, quantity }), 
        });

        if (response.ok) {
            const cart = await response.json();
            console.log('Cart updated:', cart);
            showToast('Product added to cart!');
        } else {
            console.error('Failed to add to cart:', response.statusText);
            showToast('Failed to add to cart. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred. Please try again.');
    }
}

// Show toast message
function showToast(message) {
    const toastEl = document.getElementById('cart-toast');
    if (!toastEl) return;  // Make sure the toast element exists

    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}








