const express = require("express")
const customerController = require("../controllers/customer")
const router = express.Router()

router.post('/update/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)
router.get('/', customerController.listCustomers)
router.get('/search', customerController.renderSearchForm)
router.get('/results', customerController.searchCustomers)
router.get('/updateForm/:id', customerController.renderUpdateForm)
router.get('/register', customerController.renderRegisterForm)
router.post('/register', customerController.createCustomer)
router.get('/get-username', customerController.getUsernameFromSession);
module.exports = router


