const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const UserService = require('../services/user.service');

var auth = async function (req, res) {

    return res.json({status: 'OK'});
}

var register = async function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { username, password, passwordConfirmation, email } = req.body;

    if (password === passwordConfirmation) {
        
        const userWithUsername = await UserService.findByUsername(username);

        if (userWithUsername) {
            return res.status(409).send({message: 'Username is already taken.'});
        }

        const userWithEmail = await UserService.findByEmail(email);

        if (userWithEmail) {
            return res.status(409).send({message: 'Email is already taken.'});
        }

        const user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save();

        // successfully created user
        return res.status(402).send({username, email});
    }
    else return res.status(422);
}

module.exports.register = register;
module.exports.auth = auth;