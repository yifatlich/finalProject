const express = require("express")
const router = express.Router()
// const Store = require("../models/store")
const storeController = require("../controllers/store")

// router.get('/stores/add', (req, res) => {
//     res.render('addStore')
// })

// router.post('/stores/add', async (req, res) => {
//     const { name, address } = req.body
//     const newStore = new Store({ name, address })

//     try {
//         await newStore.save()
//         res.redirect('/stores')
//     } catch (err) {
//         res.status(500).json({ message: "Error adding store" })
//     }
// })

// router.get('/stores', async (req, res) => {
//     try {
//         const stores = await Store.find({})
//         res.render('storeList', { stores })
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching stores" })
//     }
// })

// router.get('/stores/edit/:id', async (req, res) => {
//     try {
//         const store = await Store.findById(req.params.id)
//         res.render('editStore', { store })
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching store" })
//     }
// })

// router.post('/stores/edit/:id', async (req, res) => {
//     const { name, address } = req.body
//     try {
//         await Store.findByIdAndUpdate(req.params.id, { name, address })
//         res.redirect('/stores')
//     } catch (err) {
//         res.status(500).json({ message: "Error updating store" })
//     }
// })

// router.post('/stores/delete/:id', async (req, res) => {
//     try {
//         await Store.findByIdAndDelete(req.params.id)
//         res.redirect('/stores')
//     } catch (err) {
//         res.status(500).json({ message: "Error deleting store" })
//     }
// })

// router.get('/api/stores', async (req, res) => {
//     try {
//         const stores = await Store.find({})
//         res.json(stores)
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching stores" })
//     }
// })

router.get("/stores/add", storeController.renderAddStoreForm)
router.post("/stores/add", storeController.addStore)
router.get("/stores", storeController.listStores)
router.get("/stores/edit/:id", storeController.renderEditStoreForm)
router.post("/stores/edit/:id", storeController.editStore)
router.post("/stores/delete/:id", storeController.deleteStore)
router.get("/api/stores", storeController.getStoresJson)

module.exports = router