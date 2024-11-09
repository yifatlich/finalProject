const Customer = require("../models/customer")
const bcrypt = require("bcrypt")

const createCustomer = async (data) => {
    try {
        const customer = new Customer({
            username: data.username,
            email: data.email,
            phone: data.phone,
            address: {
                street: data.address.street,
                city: data.address.city,
                state: data.address.state,
                zipCode: data.address.zipCode
            },
            password: data.password, 
            createdAt: Date.now()
        })
        return await customer.save()
    } catch (error) {
        throw new Error("Error creating customer: " + error.message)
    }
}

const updateCustomer = async (id, data) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, {
            username: data.username,
            email: data.email,
            password: data.password,
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

const getCustomerCountByCity = async () => {
    try {
        return await Customer.aggregate([
            { $group: { _id: "$address.city", count: { $sum: 1 } } }
        ])
    } catch (error) {
        throw new Error("Error fetching customer count by city: " + error.message)
    }
}

const getCustomerByUsername = async (username) => {
    return await Customer.findOne({ username })
}

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomers,
    searchCustomers,
    getCustomerCountByCity,
    getCustomerByUsername
}