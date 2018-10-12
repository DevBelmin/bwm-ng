const mongoose = require('mongoose');
const Rental = require('./rental');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

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

// userSchema.path('email').validate(function (email) {
//     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.test(email.text); // Assuming email has a text attribute
//  }, 'The e-mail field cannot be empty.')

module.exports = mongoose.model('User', userSchema);