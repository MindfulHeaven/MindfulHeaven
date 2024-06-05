const mongoose = require('mongoose');
const User = require('./user')

const sessionBookingSchema = new mongoose.Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
 },
 therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true,
 },
 session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
 },
 createdAt: {
    type: Date,
    default: Date.now,
 },
});

const SessionBooking = mongoose.model('SessionBooking', sessionBookingSchema);
module.exports = SessionBooking;