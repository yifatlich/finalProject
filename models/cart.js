// models/cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    userId: { type: String, required:true },
});

module.exports = mongoose.model('Cart', cartSchema);
