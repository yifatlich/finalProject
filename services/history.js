const Hist = require('../models/history');
const Cart = require('../models/cart');

const HistoryService = {
    async addToHistory(username, cart) {

        try {
            let history = await Hist.findOne({ username });
            if (!history) {
                history = new Hist({
                    username: username,
                    carts: [cart],
                });
            } else {
                history.carts.push(cart);
            }

            history.updatedAt = Date.now();
            const updatedHistory = await history.save();
            return updatedHistory;

            console.log('History updated successfully');
        } catch (error) {
            console.error('Error adding cart to History:', error.message);
        }
    }
};




module.exports = HistoryService;