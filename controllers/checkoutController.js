const Cart = require('../services/cart.js');
const Hist = require('../services/history.js');

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
        res.render('checkoutView', { cart });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: error.message });
    }
}

exports.completeCheckout = async (req, res) => {
    const username = req.session.username;

    if (!username) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    try {
        const cart = await Cart.getCartByUsername(username);
        const hist = await Hist.addToHistory(username, cart);
        const new_cart = await Cart.clearCart(username);
        return res.redirect('/');

        if (!cart) {
            return res.status(500).json({ message: 'Failed to add cart to history' });
        }
        return res.json(cart);
    } catch (error) {
        console.error('Error in completeCheckout:', error);
        return res.status(500).json({ message: error.message });
    }
}
