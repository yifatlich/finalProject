// services/productService.js
const Product = require('../models/product');

class ProductService {
    // Get all products
    static async getAllProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }

    // In your productService.js or equivalent file
    static async getByCategory(category) {
        try {
            const products = await Product.find({ category: new RegExp(`^${category}$`, 'i') });
            return products;
        } catch (error) {
            console.error("Error fetching products by category in service:", error);
            throw error;
        }
    }

    // Get a product by ID
    static async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error('Error fetching product: ' + error.message);
        }
    }

   
    


    // Add a new product
    static async addProduct(productData) {
        const newProduct = new Product(productData);
        try {
            return await newProduct.save();
        } catch (error) {
            throw new Error('Error adding product: ' + error.message);
        }
    }

    // Update a product
    static async updateProduct(id, productData) {
        try {
            return await Product.findByIdAndUpdate(id, productData, { new: true });
        } catch (error) {
            throw new Error('Error updating product: ' + error.message);
        }
    }

    // Delete a product
    static async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }
}



module.exports = ProductService;
