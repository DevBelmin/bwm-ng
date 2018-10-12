const User = require('../models/user');
const { validationResult } = require('express-validator/check');

exports.auth = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    if (password === passwordConfirmation) {

        const user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save();

        res.json({ username, email });
    }
    else res.status(422);
}

exports.register = function (req, res) {

}