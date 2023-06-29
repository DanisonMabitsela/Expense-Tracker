const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Income", incomeSchema);
