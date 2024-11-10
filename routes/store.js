const express = require("express")
const router = express.Router()
const storeController = require("../controllers/store")

router.get("/stores/add", storeController.renderAddStoreForm)
router.post("/stores/add", storeController.addStore)
router.get("/stores", storeController.listStores)
router.get("/stores/no-actions", storeController.listStoresNoActions)
router.get("/stores/edit/:id", storeController.renderEditStoreForm)
router.post("/stores/edit/:id", storeController.editStore)
router.delete("/stores/:id", storeController.deleteStore)
router.get("/api/stores", storeController.getStoresJson)

module.exports = router