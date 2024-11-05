const Customer = require('../models/customer')
const customerService = require('../services/customer')
const bcrypt = require('bcrypt')

exports.showLoginPage = (req, res) => {
    const messages = req.flash('error')
    res.render('login', { messages })
}

exports.handleLogin = async (req, res) => {
    const { username, password } = req.body

    try {
        const customer = await customerService.searchCustomers({ username })
        if (!customer || customer.length === 0) {
            req.flash('error', 'Invalid username')
            return res.redirect('/login')
        }

        if (password !== customer[0].password) {
            req.flash('error', 'Invalid password')
            return res.redirect('/login')
        }
        res.redirect('/')
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).send("An error occurred during login")
    }
}
