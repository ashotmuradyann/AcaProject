const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    coins: {
      type: Number,
      default: 1000,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
    },
    orders: {
      type: [String],
      default: [],
    },
    carts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
