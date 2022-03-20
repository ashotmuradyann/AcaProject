const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // tokenneri cocinery severic galis e browser
require("dotenv").config();
const AssertionError = require("chai").AssertionError;

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

const port = process.env.PORT;
const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const ticketRoutes = require("./Routes/ticketRoutes.js");

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

app.use((err, req, res, next) => {
  if (err instanceof AssertionError) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
