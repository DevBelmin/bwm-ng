const User = require('../models/user');

async function findByUsername (username) {
    try {
        return User.findOne({'username': username.toLowerCase().trim()})
    }
    catch (error) {
        throw new Error('Unable to perform requested operation: findByUsername.', error);
    }
}

async function findByEmail (email) {
    try {
        return User.findOne({'email': email.toLowerCase().trim()})
    }
    catch (error) {
        throw new Error('Unable to perform requested operation: findByEmail.', error);
    }
}

module.exports.findByEmail = findByEmail;
module.exports.findByUsername = findByUsername;