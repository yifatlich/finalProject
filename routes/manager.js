const express = require("express")
const managerController = require("../controllers/managerController")
const router = express.Router()

//delete manager
router.delete('/:id', managerController.deleteManager)

//get list of managers
router.get('/', managerController.listManagers)

//show new manager form
router.get('/register', managerController.renderAddManagerForm)

//create new manager
router.post('/register', managerController.createManager)

//show manager view
router.get('/managerView', managerController.renderManagerView);
module.exports = router