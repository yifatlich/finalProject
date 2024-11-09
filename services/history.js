const Hist = require('../models/history');
const Cart = require('../models/cart');
const mongoose = require('mongoose');

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
    },

    async getHistoryByUsername(username) {
        return await Hist.findOne({ username });
    },

    //async getCartByUsername(username, updatedAt) {
    //    const hist = await Hist.findOne({ username });
    //    return await hist.findOne({ updatedAt });
    //}
    async getCartByUsername(username, cart_id) {

        try {
            // Use an aggregation pipeline to unwind the carts and match the specific cart by date
            const result = await Hist.aggregate([
                { $match: { username: username } },
                { $unwind: "$carts" },
                { $match: { "carts._id": new mongoose.Types.ObjectId(cart_id) } }, // Match cart by _id
                { $project: { cart: "$carts" } }
            ]);

            // Check if any carts were found
            if (result.length > 0) {
                return result[0].cart; // Return the first matched cart
            } else {
                return null; // Return null if no carts match the criteria
            }
        } catch (error) {
            console.error('Error retrieving cart:', error);
            throw error; // Rethrow or handle error as needed
        }
    }

};




module.exports = HistoryService;