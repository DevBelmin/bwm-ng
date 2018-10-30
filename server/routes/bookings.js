const express = require('express');
const router = express.Router();
const UserCtr = require('../controllers/auth');
const BookingCtr = require('../controllers/booking');
const { check } = require('express-validator/check');

router.post('', 
[
    UserCtr.authMiddleware, 
    check('userId', {message: "userId is required"}).not().isEmpty(),
    check('userId', {message: "userId is not in correct format"}).isMongoId(),
    check('rentalId', {message: "rentalId is required"}).not().isEmpty(),
    check('rentalId', {message: "rentalId is not in correct format"}).isMongoId(),
    check('startAt', {message: "startAt is required"}).not().isEmpty().isString(),    
    check('endAt', {message: "endAt is required"}).not().isEmpty().isString(),
    check('guests', {message: "guests is required"}).not().isEmpty(),
    check('guests', {message: "guests must be a postive number"}).isNumeric().isInt().custom((value) => {
        return value > 0;
    })
],
BookingCtr.createBooking);

module.exports = router;