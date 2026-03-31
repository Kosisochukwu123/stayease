const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  hotel:  { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  body:   { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Review', schema);