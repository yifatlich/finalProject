const Hist = require('../models/history');
const Cart = require('../models/cart');

const HistoryService = {
    async addToHistory(cart) {

        try {
            let history = await Hist.findOne({ username });

            if (!history) {
                history = new history({
                    username: username,
                    carts: [cart],
                });
            } else {
                history.items.push(cart);
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