const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer')
const productController = require('../controllers/productController')

router.get('/api/customers/count-by-city', customerController.getCustomerCountByCity)
router.get('/api/products/count-by-category', productController.getProductCountByCategory)
router.get('/statistics', (req, res) => {
    res.render('statistics')
})


module.exports = router
