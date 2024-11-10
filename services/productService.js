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

    

    // Get products by category
    static async getByCategory(category) {
        try {
            const products = await Product.find({ category: new RegExp(`^${category}$`, 'i') });
            return products;
        } catch (error) {
            console.error("Error fetching products by category:", error);
            throw error;
        }
    }

    static async getByCategoryAndPriceRange(category, priceRange) {
        try {
            const rangeMap = {
                "0-50": [0, 50],
                "51-100": [51, 100],
                "101-150": [101, 150],
                "151-200": [151, 200],
                "201-250": [201, 250],
                "250+": [250, Infinity], 
            }
            const [minPrice, maxPrice] = rangeMap[priceRange] || [0, Infinity]
            return await Product.find({
                category: new RegExp(`^${category}$`, 'i'),
                price: { $gte: minPrice, $lte: maxPrice }
            })
        } catch (error) {
            throw new Error('Error fetching products by category and price range: ' + error.message)
        }
    }

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

    static async getProductCountByCategory() {
        try {
            return await Product.aggregate([
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ]);
        } catch (error) {
            throw new Error("Error fetching product count by category: " + error.message);
        }
    }

    static async groupProductsByPriceRange() {
        try {
            const result = await Product.aggregate([
                {
                    $bucket: {
                        groupBy: "$price",
                        boundaries: [0, 50, 100, 150, 200, 250, Infinity], 
                        default: "Other",
                        output: {
                            totalProducts: { $sum: 1 }, 
                            avgPrice: { $avg: "$price" } 
                        }
                    }
                }
            ])
            return result
        } catch (err) {
            throw new Error("Error in aggregation: " + err.message)
        }
    }
    static searchProducts = async (query) => {
        return await Product.find(query)
    }
}

module.exports = ProductService;
