const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./route/User");
const TransactionRoutes=require('./route/Tranasction')
const DepositeRoutes=require('./route/Deposite')
dotenv.config();

const app = express();


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost/Finance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });


app.use("/api/user", userRoutes);
app.use('/api/deposite',DepositeRoutes);
app.use('/api/transaction',TransactionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
