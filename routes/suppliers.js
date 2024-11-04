const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier');

router.get('/product-sales-data', supplierController.getProductSalesData);

module.exports = router;
