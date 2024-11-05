const Manager = require("../models/manager")

const createManager = async (data) => {
    const manager = new Manager(data)
    return await manager.save()
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
    deleteManager,
    listManagers,
    searchManagers
}