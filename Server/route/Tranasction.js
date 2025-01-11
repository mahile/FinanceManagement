const express = require("express");
const mongoose = require('mongoose');
const TransactionModel = require("../model/Tranasaction");
const UserModel = require("../model/User"); 

const router = express.Router();


router.post("/add-transaction", async (req, res) => {
  try {
      const { date, amount, description, userId } = req.body;

      
      if (!date || !amount || !userId) {
          return res.status(400).json({ message: "Date, amount, and userId are required." });
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid userId" });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      
      if (user.balance < amount) {
          return res.status(400).json({ message: "Insufficient balance." });
      }

      
      const newTransaction = new TransactionModel({ user: userId, date, amount, description });
      await newTransaction.save();

     
      user.balance -= amount;
      await user.save();

      res.status(201).json({ success: true, message: "Transaction added successfully." });
  } catch (err) {
      console.error("Error adding transaction:", err);
      res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/get-transactions", async (req, res) => {
    try {
        const { userId } = req.query;

        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

       
        const transactions = await TransactionModel.find({ user: userId }).sort({ date: -1 }); 

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found." });
        }

        res.status(200).json({ transactions });
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
  

module.exports = router;