const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },

});

const cartSchema = new mongoose.Schema({
    username: { type: String, required: true, ref: 'Customer' },
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const historySchema = new mongoose.Schema({
    username: { type: String, required: true, ref: 'Customer' },
    carts: [cartSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


historySchema.index({ username: 1 }, { unique: true });

const cart = mongoose.model('history', historySchema);

module.exports = cart;