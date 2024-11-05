const managerService = require("../services/manager")
const productService = require('../services/productService'); 
const customerService = require('../services/customer'); 

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
        res.render('managerView', { products, customers }); // Render your manager view with data
    } catch (error) {
        console.error('Error rendering manager view:', error);
        res.status(500).send('Internal Server Error');
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
        res.redirect('/')
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).send("An error occurred during login")
    }
}