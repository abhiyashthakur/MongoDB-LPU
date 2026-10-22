const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.post('/savedata', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Invalid user data',
        errors: Object.values(error.errors).map((validationError) => validationError.message)
      });
    }

    res.status(500).json({ message: 'Failed to save user' });
  }
});

module.exports = router;
