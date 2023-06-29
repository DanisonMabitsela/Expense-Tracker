const express = require("express");
const jwt = require("jsonwebtoken");
const Income = require("../models/Income");
const User = require("../models/User");
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.userId = decoded.userId;
    next();
  });
};

// Create an income
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { amount, description } = req.body;
    const income = new Income({ amount, description, userId: req.userId });
    await income.save();
    res.status(201).json({ message: "Income created successfully" });
  } catch (error) {
    console.error("Error creating income", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get all incomes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.userId });
    res.json(incomes);
  } catch (error) {
    console.error("Error getting incomes", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update an income
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { amount, description } = req.body;
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { amount, description },
      { new: true }
    );
    res.json({ message: "Income updated successfully", income: updatedIncome });
  } catch (error) {
    console.error("Error updating income", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete an income
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Income.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
