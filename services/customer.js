const Customer = require("../models/customer")

const createCostomer = async (data) => {
    const customer = new Customer(data)
    return await customer.save()
}

const updateCustomer = async (id, data) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, {
            username: data.username,
            email: data.email,
            phone: data.phone,
            address: {
                street: data.address.street,
                city: data.address.city,
                state: data.address.state,
                zipCode: data.address.zipCode
            },
            createdAt: data.createdAt
        }, { new: true })
        
        if (!updatedCustomer) {
            throw new Error("Customer not found")
        }
        return updatedCustomer
    } catch (error) {
        throw new Error("Error updating customer: " + error.message)
    }
}

const deleteCustomer = async (id) => {
    return await Customer.findByIdAndDelete(id)
}

const listCustomers = async () => {
    return await Customer.find()
}

const searchCustomers = async (query) => {
    return await Customer.find(query)
}

module.exports = {
    createCostomer,
    updateCustomer,
    deleteCustomer,
    listCustomers,
    searchCustomers
}