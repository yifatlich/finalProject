const storeService = require("../services/store")

exports.renderAddStoreForm = (req, res) => {
    res.render("addStore")
};

exports.addStore = async (req, res) => {
    const { name, address } = req.body
    // const newStore = new Store({ name, address })

    try {
        await storeService.createStore(name, address)
        res.redirect("/stores")
    } catch (err) {
        res.status(500).json({ message: "Error adding store" });
    }
}

exports.listStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores()
        res.render("storeList", { stores })
    } catch (err) {
        res.status(500).json({ message: "Error fetching stores" })
    }
}

exports.renderEditStoreForm = async (req, res) => {
    try {
        const store = await storeService.getStoreById(req.params.id)
        res.render("editStore", { store })
    } catch (err) {
        res.status(500).json({ message: "Error fetching store" })
    }
}

exports.editStore = async (req, res) => {
    const { name, address } = req.body
    try {
        await storeService.updateStore(req.params.id, name, address)
        res.redirect("/stores");
    } catch (err) {
        res.status(500).json({ message: "Error updating store" })
    }
}

exports.deleteStore = async (req, res) => {
    try {
        await storeService.deleteStore(req.params.id)
        res.redirect("/stores")
    } catch (err) {
        res.status(500).json({ message: "Error deleting store" })
    }
}

exports.getStoresJson = async (req, res) => {
    try {
        const stores = await storeService.getAllStores()
        res.json(stores)
    } catch (err) {
        res.status(500).json({ message: "Error fetching stores" })
    }
}
