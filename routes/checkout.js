const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Route to get the checkout items for a user
router.get('/:username', checkoutController.getCartByUsername);

// Route to clear the cart
router.get('/complete/:username', checkoutController.completeCheckout);

module.exports = router;
