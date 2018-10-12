const User = require('../models/user');

exports.auth = function (req, res) {

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