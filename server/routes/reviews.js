const router = require('express').Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// Public — anyone can read reviews for a hotel
router.get('/:hotelId', async (req, res) => {
  try {
    res.json(await Review.find({ hotel: req.params.hotelId }).sort('-createdAt'));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Admin only — get all reviews
router.get('/admin/all', auth, adminOnly, async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort('-createdAt')
      .populate('hotel', 'name');
    res.json(reviews.map(r => ({ ...r.toObject(), hotelName: r.hotel?.name })));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Admin only — add a review
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Admin only — delete a review
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;