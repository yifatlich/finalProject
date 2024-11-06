const Cart = require('../services/cart.js');

exports.addToCart = async (req, res) => {
    const { productId, productName, price, quantity } = req.body;
    const username = req.session.username;
    
    if (!username) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    try {
        const cart = await Cart.addToCart(username, productId, productName,price, quantity);

        if (!cart) {
            return res.status(500).json({ message: 'Failed to add item to cart' });
        }
        return res.json(cart);
    } catch (error) {
        rconsole.error('Error in addToCart:', error);
        return res.status(500).json({ message: error.message });
    }
}

exports.getCartByUsername = async (req, res) => {
    const username = req.session.username;
    if (!username) {
        return res.redirect('/login');
    }
    try {
        const cart = await Cart.getCartByUsername(username);

        if (!cart) {
            return res.render('cartView', { cart: null }); 
        }
        res.render('cartView', { cart });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: error.message });
    }
}

exports.removeItemFromCart = async (req, res) => {
    const {productId } = req.body;
    try {
        const cart = await Cart.removeItemFromCart(productId);
        res.status(200).jason(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.clearCart = async (req, res) => {
    const username = req.session.username;
    try {
        const cart = await Cart.clearCart(username);
        res.status(200).jason(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.calculateTotalPrice = async (req, res) => {
    const username = req.session.username;
    try {
        const cart = await Cart.calculateTotalPrice(username);
        res.status(200).jason(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
