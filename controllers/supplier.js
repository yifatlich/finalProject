// controllers/supplier.js
const Product = require('../models/product');

exports.getProductSalesData = async (req, res) => {
    try {
        const supplierId = req.user.id;  // Get the supplier ID

        
        const salesData = await Product.aggregate([
            { $match: { supplierId: supplierId } },
            { $group: { _id: "$name", totalSales: { $sum: "$sales" } } },
            { $sort: { totalSales: -1 } }
        ]);

        res.json(salesData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sales data" });
    }
};
