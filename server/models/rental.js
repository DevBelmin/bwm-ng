const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: { type: String, required: true, max: [128, 'To long, max 128 characters.']},
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'To short, min 4 characters are required.']},
    category: { type: String, required: true, lowercase: true},
    image: { type: String, required: true},
    beadrooms: { type: Number},
    shared: { type: Boolean},
    description: { type: String, required: true},
    dailyRate: { type: Number},
    createdAt: { type: Date, default: Date.now},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

module.exports = mongoose.model('Rental', rentalSchema);