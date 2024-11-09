const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  outlet: {
    type: Boolean,
    required: true,
  },
  accessible: {
    type: Boolean,
    required: true,
  },
})

module.exports = mongoose.model("Store", storeSchema)