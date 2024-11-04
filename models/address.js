const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  name: String,
  address: String
})

module.exports = mongoose.model("Address", addressSchema)