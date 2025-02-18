const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: String,
  transactionId: String,
  amount: Number,
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
