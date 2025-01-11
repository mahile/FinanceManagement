const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "secretKey";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

router.post("/signup", async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname  || !lname  || !email  || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new UserModel({ fname, lname, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

   
    const user = await UserModel.findById(mongoose.Types.ObjectId(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    res.json({
      _id: user._id,
      name: user.fname,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;