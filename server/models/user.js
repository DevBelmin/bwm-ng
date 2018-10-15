const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// TODO: Move this to environement config
const saltRounds = 10;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    username: { 
        type: String, 
        required: 'Username is required', 
        max: [32, 'To long, max 32 characters.'],
        min: [4, 'To short, min 4 characters are required.']
    },
    password: { 
        type: String, 
        required: 'Password is required', 
        max: [32, 'To long, max 32 characters.'],
        min: [4, 'To short, min 4 characters are required.']
    },
    email: { 
        type: String, 
        required: 'Email is required',
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

userSchema.pre('save', function (next) {

    const user = this;

    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
        //TOOD: Handle errors
        });
    });
});

module.exports = mongoose.model('User', userSchema);