const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

const UserCtr = require('../controllers/auth');

router.get('', (req, res) => {
    Rental.find({}, (err, foundRentals) => {
        res.json(foundRentals);
    })
});

router.get('/secret', UserCtr.authMiddleware, function(req, res) {

    return res.json({secret: true});
})

router.get('/:id', (req, res) => {

    const rentalId = req.params.id;

    Rental.findById(rentalId, (err, foundRental) => {
        if (err) {
            res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
        }
        res.json(foundRental);
    })
});

module.exports = router;