const express = require("express")
const router = express.Router()
const Address = require("../models/address")

router.get('/api/addresses', async (req, res) => {
  try {
    const addresses = await Address.find({})
    res.json(addresses)
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses" })
  }
});

router.get('/address', (req, res) => {
    res.render('address')
  })

module.exports = router
