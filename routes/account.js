const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to get the checkout items for a user
router.get('/:username', accountController.getAccountByUsername);

module.exports = router;
