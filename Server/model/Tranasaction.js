const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
  },
  date: {
    type: Date,
    required: [true, "Transaction date is required"],
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount is required"],
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);