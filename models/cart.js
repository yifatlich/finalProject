
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
     
});

const cartSchema = new mongoose.Schema({
    username: { type: String, required: true, ref: 'Customer' },
    items: [cartItemSchema], 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


cartSchema.index({ username: 1 }, { unique: true });

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;