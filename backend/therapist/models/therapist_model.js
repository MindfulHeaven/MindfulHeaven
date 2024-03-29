const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: String,
  category: String, 
  type: String, 
  address:String,
  number:String,
  email:String,
  ratings:Number
});

const Therapist = mongoose.model('Therapist', therapistSchema);
module.exports = Therapist;