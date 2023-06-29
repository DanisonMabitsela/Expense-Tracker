require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const User = require("./models/User");
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Use Helmet to set various HTTP headers

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/incomes", require("./routes/incomes"));

// Get user data
app.get("/api/user", async (req, res) => {
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

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.sendStatus(500);
  }
};
// Use the getAllUsers function as a route handler for the GET /api/users route
app.get("/api/users", getAllUsers);

// Delete a user by ID (admin only)
app.delete("/api/users/:userId", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ error: "Missing token" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user.isAdmin) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error(`Error deleting user ${req.params.userId}`, error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
