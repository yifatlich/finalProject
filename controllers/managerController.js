const managerService = require("../services/manager")
const productService = require('../services/productService'); 
const customerService = require('../services/customer'); 
const storeService = require('../services/store'); 
const Manager = require("../models/manager");

exports.createManager = async (req, res) => {
    try {
        const manager = await managerService.createManager(req.body)
        res.status(201).redirect('/managers')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteManager = async (req, res) => {
    try {
        await managerService.deleteManager(req.params.id)
        res.redirect('/managers')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.renderAddManagerForm = (req, res) => {
    res.render('managerAdd')
}

exports.listManagers = async (req, res) => {
    try {
        const managers = await managerService.listManagers()
        res.render("managerList", { managers })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



exports.renderManagerView = async (req, res) => { // Add async here
    try {
        const products = await productService.getAllProducts(req, res); // Use existing method to fetch products
        const customers = await customerService.listCustomers(req, res);
        const stores = await storeService.getAllStores(req, res);
        const managers = await managerService.listManagers(req, res);
        res.render('managerView', { products, customers, stores, managers }); // Render your manager view with data
    } catch (error) {
        console.error('Error rendering manager view:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.showUpdateManagerForm = async (req, res) => {
    try {
        const managerId = req.params.id
        const manager = await managerService.searchManagers({ _id: managerId })
        res.render("managerUpdate", { manager: manager[0] })
    } catch (error) {
        res.status(500).send("Error retrieving manager for update")
    }
}

exports.updateManager = async (req, res) => {
    const { name, password } = req.body;

    const updatedManagerData = {
        name,
        password
    };

    try {
        await managerService.updateManager(req.params.id, updatedManagerData);
        res.redirect('/managers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.renderLoginForm = (req, res) => {
    res.render('managerLogin')
}

exports.handleLogin = async (req, res) => {
    const { username, password } = req.body

    try {
        const manager = await managerService.searchManagers({ username })
        if (!manager || manager.length === 0) {
            req.flash('error', 'Invalid username')
            return res.redirect('/managers/login')
        }

        if (password !== manager[0].password) {
            req.flash('error', 'Invalid password')
            return res.redirect('/managers/login')
        }
        res.redirect('/managers/managerView')
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).send("An error occurred during login")
    }
}

exports.renderSearchManager = (req, res) => {
    res.render('managerSearch')
}

exports.searchManagers = async (req, res) => {
    try {
        const { field, value } = req.query
        let managers = []
        let message = ""
        if (field && value) {
            const filter = {
                [field]: { $regex: value, $options: "i" }
            }
            managers = await managerService.searchManagers(filter)
        }
        if (managers.length === 0 && value) {
            message = "No managers found"
        }
        res.render("managerResults", { managers, message })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


