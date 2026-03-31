const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel:     { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  checkIn:   { type: Date, required: true },
  checkOut:  { type: Date, required: true },
  guests:    { type: Number, default: 1 },
  totalPrice: Number,
}, { timestamps: true });
module.exports = mongoose.model('Booking', schema);