const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');
const { check } = require('express-validator/check');

router.post('', [
  // Request validator middleware
  check('email', {message: "Invalid email address data"}).not().isEmpty().isString(),
  check('password', {message: "Invalid password data"}).not().isEmpty().isString(),

  check('password', {message: 'Minimal password length is 4 characters'}).isLength({ min: 4 }),
  check('password', {message: 'Maximal password length is 32 characters'}).isLength({ max: 32 }),
  check('email', {message: "Provided email is not a valid email address"}).isEmail(),
  ],
  userController.auth);

router.post('/register', [
  // Request validator middleware
  check('username', {message: "Invalid username data"}).not().isEmpty().isString(),
  check('email', {message: "Invalid email data"}).not().isEmpty().isString(),
  check('password', {message: "Invalid password data"}).not().isEmpty().isString(),
  check('passwordConfirmation', {message: "Invalid confirm password data"}).not().isEmpty().isString(),

  check('username', {message: "Minimal username length is 4 characters"}).isLength({ min: 4 }),
  check('username', {message: "Maximal username length is 32 characters"}).isLength({ max: 32 }),
  check('password', {message: "Maximal password length is 4 characters"}).isLength({ min: 4 }),
  check('password', {message: "Minimal password length is 32 characters"}).isLength({ max: 32 }),

  check('email', {message: "Provided email is not a valid email address"}).isEmail(),
  ],
  userController.register);

module.exports = router;