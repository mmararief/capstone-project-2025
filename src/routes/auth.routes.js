const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Contoh endpoint placeholder
router.get('/', (req, res) => {
  res.json({ message: 'Auth routes placeholder' });
});

module.exports = router;