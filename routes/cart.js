const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add an item to the cart
router.post('/add', cartController.addToCart);

// Route to remove an item from user  cart
router.delete('/remove', cartController.removeItemFromCart);

// Route to get the cart items for a user
router.get('/:username', cartController.getCartByUsername);

// Route to clear the cart
router.delete('/clear/:username', cartController.clearCart);

module.exports = router;
