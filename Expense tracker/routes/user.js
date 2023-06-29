const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Get user data
router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ error: "Missing token" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Error getting user data", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
