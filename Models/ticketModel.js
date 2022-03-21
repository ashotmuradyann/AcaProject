const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      coins: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  const ticketModel = mongoose.model("Ticket",ticketSchema);

  module.exports = ticketModel
  