const ticketModel = require("../models/ticketModel.js");

async function createTicket(req, res) {
  if (req.user) {
    const { name, description, price, quantity, countries,date } = req.body;
    try {
      const newTicket = new ticketModel({
        name,
        description,
        price,
        quantity,
        countries,
        date,
        userId: req.user._id,
      });
      await newTicket.save();
      res.send(newTicket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  else{
    res.status(401).json({ message: "You are not authorized" });
  }
}

module.exports = {
  createTicket,
};
