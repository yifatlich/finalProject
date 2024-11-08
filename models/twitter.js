const mongoose = require('mongoose')

const twitterUsernameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
})
  
module.exports = mongoose.model('TwitterUsername', twitterUsernameSchema)