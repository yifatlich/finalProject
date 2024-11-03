const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

// Create a new product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get product by id
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//get product by name
router.get('/products/name/:name', async (req, res) => {
    try {
        const product = await Product.findByName(req.params.name);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Update a product's quantity
router.patch('/products/:id', async (req, res) => {
    const { quantity } = req.body; 
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        if (quantity !== undefined && typeof quantity === 'number') {
            product.quantity = quantity; 
            await product.save();
            res.status(200).send({ message: 'Product updated successfully', product });
        } else {
            res.status(400).send({ message: 'Invalid quantity' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Delete a product by id
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// product details page
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.render('productsDetails', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
