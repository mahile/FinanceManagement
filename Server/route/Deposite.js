const express = require("express");
const mongoose = require("mongoose");
const DepositModel = require("../model/Deposite");
const UserModel = require("../model/User");

const router = express.Router();

router.post("/:userId/add-deposit", async (req, res) => {
  try {
    const { amount } = req.body;
    const { userId } = req.params;

    console.log("Received userId:", userId);
    console.log("Received amount:", amount);

    if (!amount || isNaN(amount) || amount <= 0 || !userId) {
      return res.status(400).json({ message: "Invalid amount or userId" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newDeposit = new DepositModel({ amount, user: userId });
    await newDeposit.save();
     console.log(newDeposit);
    user.balance += amount;
    await user.save();

    res.status(201).json({ success: true, message: "Deposit added successfully" });
  } catch (err) {
    console.error("Error adding deposit:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/total-deposits", async (req, res) => {
  try {
      const { userId } = req.query;
      console.log("userId", userId);

      if (!userId) {
          return res.status(400).json({ message: "userId (_id) is required" });
      }

      const user = await UserModel.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      console.log("user", user);
      console.log("balance", user.balance);

      return res.status(200).json({ balance: user.balance });
  } catch (err) {
      console.error("Error fetching deposits:", err);
      res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;