const Cart = require('../services/cart.js');

exports.addToCart = async (req, res) => {
    const { productId, price, quantity } = req.body;
    const username = req.session.username;
    console.log('Session Info:', req.session.username);
    if (!username) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    try {
        const cart = await Cart.addToCart(username,productId, price, quantity);
        res.status(200).json(cart);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCartByUsername = async (req, res) => {
    const username = req.session.username;
    try {
        const cart = await Cart.getCartByUsername(username);
        res.status(200).json(cart);
    } catch (error) {
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
