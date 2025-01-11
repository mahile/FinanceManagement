const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FinanceSchema = new mongoose.Schema({
  fname: { type: String, required: [true, "First name is required"] },
  lname: { type: String, required: [true, "Last name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: { type: String, required: [true, "Password is required"], minlength: 6 },
  balance: { type: Number, default: 0 },
  userId: { type: String, unique: true }, 
});


FinanceSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      if (!this.userId) {
        this.userId = `USER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; 
      }      
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", FinanceSchema);