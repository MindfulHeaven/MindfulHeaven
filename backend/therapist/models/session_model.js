const mongoose = require('mongoose');
// const User = require("../../authentication/models/User")

const sessionSchema = new mongoose.Schema({
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;