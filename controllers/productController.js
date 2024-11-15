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
    const existingProduct = await ProductService.searchProducts({
        $or: [
          { id: id }
        ]
    });
    if (existingProduct.length > 0) {
        const messages = ['Id already exists.'];
        return res.render('productAdd', { messages });
    }
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
        res.render('productsDetails', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};



exports.renderProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const products = await ProductService.getByCategory(category);
        res.render('productsGrid', { products, category });
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).send("An error occurred while loading products.");
    }
};

exports.getProductCountByCategory = async (req, res) => {
    try {
        const data = await ProductService.getProductCountByCategory()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.filterProductsByPriceRange = async (req, res) => {
    const { priceRange } = req.query
    if (!priceRange) {
        return res.status(400).send('Price range is required')
    }
    try {
        const range = priceRange.split('-').map(Number)
        if (range.length !== 2) {
        return res.status(400).send('Invalid price range format')
    }
    const products = await ProductService.filterByPriceRange(range[0], range[1])
    res.render('product', { filteredProducts: products })
    } catch (err) {
      console.error("Error filtering products by price range:", err)
      res.status(500).send("Server Error")
    }
}

exports.groupProductsByPriceRange = async (req, res) => {
    try {
        const result = await ProductService.groupProductsByPriceRange()
        res.render('productGroup', { groupedProducts: result })
    } catch (err) {
        console.error("Error grouping products by price range:", err)
        res.status(500).send("Server Error")
    }
}

exports.renderProductsByCategoryWithPriceRange = async (req, res) => {
    const { category } = req.params
    const { priceRange } = req.query
    try {
        let products
        if (priceRange) {
            products = await ProductService.getByCategoryAndPriceRange(category, priceRange)
        } else {
            products = await ProductService.getByCategory(category)
        }
        res.render('productsGrid', { products, category, priceRange })
    } catch (error) {
        console.error("Error fetching products by category and price range:", error)
        res.status(500).send("An error occurred while loading products.")
    }
}



exports.renderSearchForm = (req, res) => {
    res.render("productSearch")
}

exports.searchProducts = async (req, res) => {
    try {
        const { field, value } = req.query
        let products = []
        let message = ""
        if (field && value) {
            const filter = {
                [field]: { $regex: value, $options: "i" }
            }
            products = await ProductService.searchProducts(filter)
        }
        if (products.length === 0 && value) {
            message = "No managers found"
        }
        res.render("productResults", { products, message })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


exports.renderProductsByCategoryWithPriceRangeAndNameHomePage = async (req, res) => {
    const { priceRange } = req.query
    const { category } = req.query
    const { name } = req.query

    try {
        let products
        if (priceRange && name && category) {
            products = await ProductService.getByCategoryAndPriceRangeAndNameSearch(category, priceRange, name)
        }
        else if (priceRange && category) {
            products = await ProductService.getByCategoryAndPriceRangeSearch(category, priceRange)
        }
        else if (priceRange && !name) {
            products = await ProductService.getByPriceRangeSearch(priceRange)
        }
        else if (name && category) {
            products = await ProductService.getByCategoryAndName(name, category)
        }
        else if (name) {
            products = await ProductService.getByName(name)
        }
        else {
            products = await ProductService.getByCategory(category)
        }
        let next_cate = "Clothing"
        if (!category) {
            next_cate = category
        }
        res.render('productsGrid', { products, category: next_cate, cate: category, priceRange, name })
    } catch (error) {
        console.error("Error fetching products by category and price range:", error)
        res.status(500).send("An error occurred while loading products.")
    }
}