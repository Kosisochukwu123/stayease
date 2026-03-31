const router = require('express').Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { hotel, checkIn, checkOut, guests, totalPrice } = req.body;
    const booking = await Booking.create({ user: req.user.id, hotel, checkIn, checkOut, guests, totalPrice });
    res.status(201).json(booking);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/my', auth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('hotel', 'name city images price');
  res.json(bookings);
});

module.exports = router;