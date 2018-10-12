const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');
const { check } = require('express-validator/check');

router.post('', [
    check('username').not().isEmpty().isString(),
    check('email').not().isEmpty().isString(),
    check('password').not().isEmpty().isString(),
    check('passwordConfirmation').not().isEmpty().isString(),

    check('username').isLength({ min: 4 }),
    check('username').isLength({ max: 32 }),
    check('password').isLength({ min: 4 }),
    check('password').isLength({ max: 32 }),
    
    check('email').isEmail(),

  ],
  userController.auth);

router.post('/register', userController.register);

module.exports = router;