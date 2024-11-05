const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ManagersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Manager = mongoose.model('Manager', ManagersSchema)

module.exports = Manager