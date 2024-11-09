const Store = require("../models/store")

exports.createStore = async (name, address, outlet, accessible) => {
    const outletValue = outlet === 'yes'
    const accessibleValue = accessible === 'yes'
    const newStore = new Store({ 
        name, 
        address,
        outlet: outletValue,
        accessible: accessibleValue 
    })
    return await newStore.save()
}

exports.getAllStores = async () => {
    return await Store.find({})
}

exports.getStoreById = async (id) => {
    return await Store.findById(id)
}

exports.updateStore = async (id, name, address, outlet, accessible) => {
    return await Store.findByIdAndUpdate(id, { name, address, outlet, accessible }, { new: true })
}

exports.deleteStore = async (id) => {
    return await Store.findByIdAndDelete(id)
}

exports.searchStores = async (queryParams) => {

    const { address, outlet, accessible } = queryParams;
    const query = {};

    if (address) query.address = { $regex: address, $options: 'i' };
    if (outlet === 'on') query.outlet = true;
    if (accessible === 'on') query.accessible = true;



    try {
        const result = await Store.find(query);
        return result;
    } catch (error) {
        console.error("Service: Error finding stores:", error);
        throw new Error('Error retrieving stores');
    }
}