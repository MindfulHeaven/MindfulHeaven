const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
 therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
 startTime: { type: Date, required: true },
 endTime: { type: Date, required: true },
 // Additional fields as needed
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;