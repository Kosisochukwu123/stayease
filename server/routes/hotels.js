const router = require('express').Router();
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// Public — get all hotels (with optional city filter)
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    const filter = city ? { city: new RegExp(city, 'i') } : {};
    res.json(await Hotel.find(filter));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Public — get single hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Admin only — create hotel
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Admin only — update hotel
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Admin only — delete hotel
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;