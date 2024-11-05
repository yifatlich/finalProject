const Customer = require('../models/customer')
const customerService = require('../services/customer')
const bcrypt = require('bcrypt')

exports.showLoginPage = (req, res) => {
    res.render('login')
}

exports.handleLogin = async (req, res) => {
    const { username, password } = req.body

    try {
        const customer = await customerService.searchCustomers({ username })
        if (!customer || customer.length === 0) {
            return res.status(400).send("Invalid username")
        }

        if (password !== customer[0].password) {
            return res.status(400).send("Invalid password")
        }
        res.send("Login successful")
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).send("An error occurred during login")
    }
}
