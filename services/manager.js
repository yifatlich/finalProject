const Manager = require("../models/manager")

const createManager = async (data) => {
    const manager = new Manager(data)
    return await manager.save()
}


const updateManager = async (id, managerData) => { 
    try {
        return await Manager.findByIdAndUpdate(id, managerData, { new: true });
    } catch (error) {
        throw new Error('Error updating manager: ' + error.message);
    }
}

const deleteManager = async (id) => {
    return await Manager.findByIdAndDelete(id)
}

const listManagers = async () => {
    return await Manager.find()
}

const searchManagers = async (query) => {
    return await Manager.find(query)
}

module.exports = {
    createManager,
    updateManager,
    deleteManager,
    listManagers,
    searchManagers
}