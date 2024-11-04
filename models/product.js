const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true
     },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required:true
    },
    supplierId: {
        type: Number,
        required:true
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
