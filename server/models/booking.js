const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    endAt: { type: Date, required: [true, 'Ending date is required']},
    startAt: { type: Date, required: [true, 'Starting date is required']},
    totalPrice: { type: Number },
    days: { type: Number },
    guests: { type: Number },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rental: { type: Schema.Types.ObjectId, ref: 'Rental' }
});

module.exports = mongoose.model('Booking', bookingSchema);