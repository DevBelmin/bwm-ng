const Booking = require('../models/booking');
const User = require('../models/user');
const Rental = require('../models/rental');

const { validationResult } = require('express-validator/check');
const moment = require('moment')

var dateFormat = "YYYY-MM-DD";

exports.createBooking = function (req, res) {

    const errors = validationResult(req);
    const { userId, rentalId, endAt, startAt, totalPrice, days, guests } = req.body;

    // Check if we have any validation check errors
    if (!errors.isEmpty() || !userId || !rentalId || !endAt || !startAt || !totalPrice || !guests) {
        return res.status(422).send({ errors: [{ title: 'Invalid data!', detail: errors.array() }] });
    }

    if (!moment(startAt, dateFormat, true).isValid()) {
        return res.status(422).send({ errors: [{ title: 'Invalid date format', detail: 'startAt is not a valid date' }] });
    }

    if (!moment(endAt, dateFormat, true).isValid()) {
        return res.status(422).send({ errors: [{ title: 'Invalid date format', detail: 'endAt is not a valid date' }] });
    }

    if (moment(startAt) > moment(endAt)) {
        return res.status(422).send({ errors: [{ title: 'Invalid dates', detail: 'endAt must be greather or equal then startAt' }] });
    }

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'User does not exist' }] });
        }

        Rental.findById(rentalId, (err, rental) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (!rental) {
                return res.status(422).send({ errors: [{ title: 'Invalid Rental!', detail: 'Rental does not exist' }] });
            }

            newBooking = new Booking(
                {
                    endAt: endAt,
                    startAt: startAt,
                    totalPrice: totalPrice,
                    days: days,
                    guests: guests,
                    user: userId,
                    rental: rentalId
                }
            )
    
            newBooking.save();
    
            return res.status(200).send({ message: 'Successfully created booking' });

        });
    });
}