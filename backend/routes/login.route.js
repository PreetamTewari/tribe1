
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

// Login route
router.post('/login', loginController.login);

// Signup route
router.post('/signup', loginController.register);

module.exports = router;
