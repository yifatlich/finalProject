const Store = require("../models/store")

exports.createStore = async (name, address) => {
    const newStore = new Store({ name, address })
    return await newStore.save()
}

exports.getAllStores = async () => {
    return await Store.find({})
}

exports.getStoreById = async (id) => {
    return await Store.findById(id)
}

exports.updateStore = async (id, name, address) => {
    return await Store.findByIdAndUpdate(id, { name, address })
}

exports.deleteStore = async (id) => {
    return await Store.findByIdAndDelete(id)
}