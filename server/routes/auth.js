const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');

router.post('', userController.auth);

router.post('/register', userController.register);

module.exports = router;