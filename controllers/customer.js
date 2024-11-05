const customerService = require("../services/customer")

exports.createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCostomer(req.body)
        res.status(201).redirect('/customers')
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

