const Supplier = require('../models/supplier');
const Product = require('../models/product');


exports.renderAddSupplierForm = (req, res) => {
    res.render("addSupplier")
};

exports.addSupplier = async (req, res) => {
    const { name, imageUrl } = req.body
    const newSupplier = new Supplier({ name, imageUrl })

    try {
        await newSupplier.save();
        res.redirect("/suppliers")
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.listSupplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find({})
        res.render("supplierList", { suppliers })
    } catch (err) {
        res.status(500).json({ message: "Error fetching suppliers" })
    }
};

exports.renderEditSupplierForm = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id)
        res.render("editSupplier", { upplier })
    } catch (err) {
        res.status(500).json({ message: "Error fetching supplier" })
    }
};

exports.editSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/suppliers");
    } catch (err) {
        res.status(500).json({ message: "Error updating supplier" })
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id)
        res.redirect("/suppliers");
    } catch (err) {
        res.status(500).json({ message: "Error deleting supplier" })
    }
};

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
