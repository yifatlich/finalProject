// controllers/productController.js
const ProductService = require('../services/productService');

// List all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.render('productsList', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// Show form to add a new product
exports.showAddProductForm = (req, res) => {
    res.render('productAdd');
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, id, description, price, category, imageUrl, quantity } = req.body;

    const newProductData = {
        name,
        id,
        description,
        price,
        category,
        imageUrl,
        quantity
    };

    try {
        await ProductService.addProduct(newProductData);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Show form to update a product
exports.showUpdateProductForm = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        res.render('productUpdate', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { name, id, description, price, category, imageUrl, quantity } = req.body;

    const updatedProductData = {
        name,
        id,
        description,
        price,
        category,
        imageUrl,
        quantity
    };

    try {
        await ProductService.updateProduct(req.params.id, updatedProductData);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Product details page
exports.getProductDetails = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        res.render('productDetails', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

// Function to render the product grid page
//exports.renderProductGrid = async (req, res) => {
   // try {
     //   const products = await productService.getAllProducts(); 
       // res.render('productsGrid', { products });
   // } catch (error) {
     //   res.status(500).send("An error occurred while loading products.");
    //}
//};

exports.renderProductGrid = async (req, res) => {
    try {
        products = await ProductService.getAllProducts();
        res.render('productsGrid', { products });
    } catch (error) {
        res.status(500).send("An error occurred while loading products.");
    }
};

