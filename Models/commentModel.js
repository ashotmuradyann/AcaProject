const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
