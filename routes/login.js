// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

// Route to show the login page
router.get('/', loginController.showLoginPage);

// Route to handle login form submission
router.post('/', loginController.handleLogin);

module.exports = router;
