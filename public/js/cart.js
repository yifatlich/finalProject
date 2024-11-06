
async function addToCart(productId, productName, productPrice) {
    const quantity = 1; 

    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId,productName, price: productPrice, quantity }), 
        });

        if (response.ok) {

            const cart = await response.json();
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



// Function to remove an item from the cart
function removeFromCart(productId) {
    fetch('/cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
    })
        .then(response => response.json())
        .then(data => {
            location.reload();
            if (data.success) {
                location.reload(); // Reload the page after removing item
            } else {
                console.log('Failed to remove item');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to update item quantity (+ or -)
function updateQuantity(productId, delta) {
    fetch('/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, delta })
    })
        .then(response => response.json())
        .then(data => {
            location.reload();
            if (data.success) {
                location.reload(); // Reload the page to reflect the updated cart
            } else {
                console.log('Failed to update quantity');
            }
        })
        .catch(error => console.error('Error:', error));
}






