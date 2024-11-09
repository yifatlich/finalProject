const Cart = require('../services/cart.js');
const Hist = require('../services/history.js');
const Customer = require("../services/customer");

exports.getAccountByUsername = async (req, res) => {
    const username = req.session.username;
    if (!username) {
        return res.redirect('/login');
    }
    try {
        const hist = await Hist.getHistoryByUsername(username);
        const customer = await Customer.getCustomerByUsername(username);

        res.render('account', { history: hist, customer: customer });
    } catch (error) {
        console.error('Error retrieving account:', error);
        res.status(500).json({ message: error.message });
    }
}
