const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/register',register);
router.post('/login', login);


router.get('/profile', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ msg: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;