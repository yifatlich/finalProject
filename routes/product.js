const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// list all products
router.get('/', productController.getAllProducts);

//form to add a new product
router.get('/add', productController.showAddProductForm);

//add a new product
router.post('/', productController.addProduct);

//form to update a product
router.get('/updateForm/:id', productController.showUpdateProductForm);

//update a product
router.post('/:id', productController.updateProduct);

//delete a product
router.delete('/:id', productController.deleteProduct);

//product detailes page
router.get('/:id', productController.getProductDetails);





module.exports = router;
