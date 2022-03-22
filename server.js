const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const AssertionError = require("chai").AssertionError;

const app = express();
const port = process.env.PORT;
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const ticketRoutes = require("./Routes/ticketRoutes.js");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tickets", ticketRoutes);

app.use((err, req, res, next) => {
  if (err instanceof AssertionError) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next();
});
