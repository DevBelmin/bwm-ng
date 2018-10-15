var jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const config = require('../config/dev')

var auth = function (req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send("Invalid data");
    }

    User.findOne({'email': email.toLowerCase().trim()}, function(err, user) {
        if (err) {
            return res.status(409).send({message: `An error occured while trying to find user with email: ${email}`, err});
        }

        if (!user) {
            return res.status(409).send({message: 'Invalid credentials.'});
        }

        if (!user.isPasswordMatch(password)) {
            return res.status(409).send({message: 'Invalid credentials.'});
        }
        
        token = jwt.sign({
            userId: user._id,
            email: user.email
        }, config.SECRET, { expiresIn: config.EXPIRATION });

        return res.json(token);

    })
}

var register = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { username, password, passwordConfirmation, email } = req.body;

    if (password !== passwordConfirmation) {
        return res.status(422).send("Password and Confirmed Password are not matching.");
    }

    User.findOne({'email': email.toLowerCase().trim()}, function(err, existingUser) {
        if (err) {
            return res.status(409).send({message: `An error occured while trying to find user with email: ${email}`, err});
        }

        if (existingUser) {
            return res.status(409).send({message: 'Email is already taken.'});
        }

        User.findOne({'username': username.toLowerCase().trim()}, function(err, existingUser) {
            if (err) {
                return res.status(409).send({message: `An error occured while trying to find user with username: ${username}`, err});
            }
    
            if (existingUser) {
                return res.status(409).send({message: 'Username is already taken.'});
            }

            const user = new User({
                username: username,
                email: email,
                password: password
            });
        
            user.save(function(err) {
                if (err) {
                    return res.status(422).send(json(err));
                }
        
                 // successfully created user
                return res.status(402).send({'registered': true});
            });
        });
    });
}

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({title: 'Not authorized!', details: 'You need to login to get access!'});
    }

    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {

        if (err) {
            return res.status(401).send('Error occured while trying to find the user in DB', err);
        }

        if (user) {
            // suggested way by express to store the data for the next midleware
            res.locals.user = user;
            next();
        }
        else {
            return res.status(401).send('Error occured while trying to find the user in DB', err);
        }
    })
}

function parseToken(token) {
    // ignoring the first part (BEARER by convention), and extracting just the JWT token
     return decoded = jwt.verify(token.split(' ')[1], config.SECRET);
}

module.exports.register = register;
module.exports.auth = auth;