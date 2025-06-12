const express = require('express');
const router = express.Router();
const recommendController = require('../controllers/recommend.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/by_place', authMiddleware, recommendController.recommendByPlace);
router.get('/by_category', recommendController.recommendByCategory);
router.get('/nearby', recommendController.recommendNearby);
router.get('/popular', recommendController.recommendPopular);

// Contoh endpoint placeholder
router.get('/', (req, res) => {
  res.json({ message: 'Recommend routes placeholder' });
});

module.exports = router;