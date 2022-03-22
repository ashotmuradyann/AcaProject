const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  canCancel: {
    type: Boolean,
    required: true,
    default: false,
  },
  cancelDate: {
    type: Boolean,
    required: true,
    default: false,
  },
  countries: {
    type: [String],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
    default: [],
  },
  likesCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;
