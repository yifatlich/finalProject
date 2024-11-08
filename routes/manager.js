const { Router } = require("express")
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

router.get('/updateForm/:id', managerController.showUpdateManagerForm);

//update a manager
router.post('/update/:id', managerController.updateManager);

//show manager view
router.get('/managerView', managerController.renderManagerView);

router.get('/login', managerController.renderLoginForm);
router.post('/login', managerController.handleLogin)

router.get('/search', managerController.renderSearchManager)

router.get('/results', managerController.searchManagers)

module.exports = router