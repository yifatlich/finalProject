const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier');

router.get('/product-sales-data', supplierController.getProductSalesData);
router.get("/suppliers", supplierController.listSupplier)
router.get("/suppliers/add", supplierController.renderAddSupplierForm)
router.post("/suppliers/add", supplierController.addSupplier)
router.get("/suppliers/edit/:id", supplierController.renderEditSupplierForm)
router.post("/suppliers/edit/:id", supplierController.editSupplier)
router.delete("/suppliers/:id", supplierController.deleteSupplier)

module.exports = router;
