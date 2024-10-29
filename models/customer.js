const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String, 
        required: false
    },
    address: {
        street: { 
            type: String, 
            required: true 
        },
        city: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        zipCode: { 
            type: String, 
            required: true 
        }
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer