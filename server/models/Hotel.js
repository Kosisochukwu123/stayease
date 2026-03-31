const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.0 },
  images: [String],
  amenities: [String],
  rooms: { type: Number, default: 10 },
  country: String,
  extras: {
    overview: String,
    spa: String,
    dining: String,
    delicacies: [
      {
        name: String,
        description: String,
        image: String,
      },
    ],
  },
});
module.exports = mongoose.model("Hotel", schema);
