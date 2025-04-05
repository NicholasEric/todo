// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Register Route
router.post(
  '/register',
  [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user
      const user = new User({ username, email, password });
      await user.save();

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Compare the entered password with the stored hashed password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
