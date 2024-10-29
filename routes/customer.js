const express = require("express")
const customerController = require("../controllers/customer")
const router = express.Router()

// router.post('/', customerController.createCustomer)
router.post('/update/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)
router.get('/', customerController.listCustomers)
router.get('/search', customerController.renderSearchForm)
router.get('/results', customerController.searchCustomers)
router.get('/updateForm/:id', customerController.renderUpdateForm)
// router.get('/searchForm', (req, res) => {
//     res.render('customerSearch')
// })
router.get('/register', customerController.renderRegisterForm)
router.post('/register', customerController.createCustomer)

module.exports = router