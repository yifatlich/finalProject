
const cart = [];

function animateCartIcon() {
    const cartIcon = document.getElementById('btn-Shopping-cart');
    cartIcon.classList.add('cart-icon-pop');
    setTimeout(() => {
        cartIcon.classList.remove('cart-icon-pop');
    }, 300);
}


// Function to update cart count badge
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}


const cartToast = new bootstrap.Toast(document.getElementById('cart-toast'));

// Function to show toast with a custom message
function showToast(message) {
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = message; 
    cartToast.show();
}

// Function to add product to cart
async function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1,
    };

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
        showToast(`${productName} quantity updated in basket`);
    } else {
        cart.push(product);
        showToast(`${productName} added to basket`);
    }

    const userId = '123'; // Replace with the actual user ID logic in your application
    const productId = existingProduct ? existingProduct.productId : product.productId; // Get productId from your product data
    const quantity = existingProduct ? existingProduct.quantity : 1;  

    try {
        const response = await fetch('http://localhost:80/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                quantity: quantity,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }
        const updatedCart = await response.json();
        console.log('Cart updated on server:', updatedCart);
        if (existingProduct) {
            showToast(`${productName} quantity updated in basket`);
        } else {
            showToast(`${productName} added to basket`);
        }
        updateCartCount();
        animateCartIcon();
    } catch (error) {
        console.error('Error adding to cart on server:', error);
        showToast('Error adding to cart, please try again.');
    }
    
}

// Function to view cart contents
function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        let cartDetails = "Your Cart:\n";
        cart.forEach(item => {
            cartDetails += `${item.name} - $${item.price} (x${item.quantity})\n`;
        });
        alert(cartDetails);
    }
}

