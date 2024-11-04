const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    supplierId: {
        type: Number,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('supplier', supplierSchema);
