
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
async function addToCart(productId, productName, productPrice) {
    console.log("Add to Cart called with:", productId, productName, productPrice); // Debug log
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
        showToast(`${productName} quantity updated in basket`);
    } else {
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
        };
        cart.push(product);
        showToast(`${productName} added to basket`);
    }
    
    try {
        const response = await fetch('http://127.0.0.1/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });

        if (!response.ok) {
            throw new Error('Failed to update the basket');
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
        console.error('Error update  basket on server:', error);
        showToast('Could not update Basket. Please try again.');
    }
    
}



function viewCart() {
    const cartDetailsElement = document.getElementById('cartDetails');
    if (cart.length === 0) {
        cartDetailsElement.innerHTML = "<p class='text-center'>Your cart is empty!</p>";
    } else {
        let cartDetails = "<ul class='list-group'>";
        cart.forEach(item => {
            cartDetails += `<li class='list-group-item d-flex justify-content-between align-items-center'>
                ${item.name} - $${item.price.toFixed(2)} (x${item.quantity})
                <div>
                    <button class='btn btn-secondary btn-sm' onclick='decreaseQuantity("${item.id}")'>-</button>
                    <span class='mx-2'>${item.quantity}</span>
                    <button class='btn btn-secondary btn-sm' onclick='increaseQuantity("${item.id}")'>+</button>
                    
                </div>
            </li>`;
        });
        cartDetails += "</ul>";
        cartDetailsElement.innerHTML = cartDetails;
    }

    // Show the modal
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Function to increment the quantity of an item in the cart
function increaseQuantity(productId) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity
        viewCart(); // Refresh cart display
    }
}

// Function to decrement the quantity of an item in the cart
function decreaseQuantity(productId) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity -= 1; // Decrease quantity
        if (existingProduct.quantity <= 0) {
            removeFromCart(productId); // Remove item if quantity is 0
        } else {
            viewCart(); // Refresh cart display
        }
    }
}








