const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials!" });
    }
    res.send({ message: "Logged in successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
