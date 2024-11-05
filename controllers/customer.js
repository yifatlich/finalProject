const customerService = require("../services/customer")
const bcrypt = require("bcrypt")

exports.createCustomer = async (req, res) => {
    try {
      const { username, email, phone, address, password } = req.body
      const existingCustomer = await customerService.searchCustomers({
        $or: [
          { username: username },
          { email: email },
          { phone: phone}
        ]
      })
      if (existingCustomer.length > 0) {
        const messages = []
        if (existingCustomer.some(c => c.username === username)) {
            messages.push('Username already exists.')
        }
        if (existingCustomer.some(c => c.email === email)) {
            messages.push('Email already exists.')
        }
        if (existingCustomer.some(c => c.phone === phone)) {
            messages.push('Phone already exists.')
        }
        return res.render('customerRegister', { messages })
      }
      const customer = await customerService.createCustomer({
        username,
        email,
        phone,
        address,
        password
      })  
      return res.redirect("/")
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.renderRegisterForm = (req, res) => {
  res.render('customerRegister')
}

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await customerService.updateCustomer(req.params.id, req.body)
        res.redirect('/customers')
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
}

exports.renderUpdateForm = async (req, res) => {
  try {
    const customerId = req.params.id
    const customer = await customerService.searchCustomers({ _id: customerId})
    res.render("customerUpdate", { customer: customer[0]})
  } catch (error) {
    res.status(500).send("Error retrieving customer for update")
  }
}

exports.deleteCustomer = async (req, res) => {
    try {
      await customerService.deleteCustomer(req.params.id)
      res.redirect('/customers')
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
}

exports.listCustomers = async (req, res) => {
    try {
      const customers = await customerService.listCustomers()
      res.render("customerList", { customers })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
}

exports.renderSearchForm = (req, res) => {
  res.render("customerSearch")
}

exports.searchCustomers = async (req, res) => {
  try {
    const { field, value } = req.query
    let customers = []
    let message = ""
    if (field && value) {
      const filter = {
        [field]: { $regex: value, $options: "i" }
      }
      customers = await customerService.searchCustomers(filter)
    }
    if (customers.length === 0 && value) {
      message = "No customers found"
    }
    res.render("customerResults", { customers, message })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.handleLogin = async (req, res) => {
  const { username, password } = req.body
  try {
    const customer = await customerService.searchCustomers({ username })
    if (!customer || customer.length === 0) {
      return res.status(400).send("Invalid username or password");
    }
    const isMatch = await bcrypt.compare(password, customer[0].password)
    if (!isMatch) {
      return res.status(400).send("Invalid username or password")
    }
    res.send("Login successful")
  } catch (error) {
    res.status(500).send("An error occurred during login")
  }
}
