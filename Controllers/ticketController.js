const ticketModel = require("../models/ticketModel.js");
const userModel = require("../Models/userModel");

async function createTicket(req, res) {
  if (req.user) {
    const { name, description, price, quantity, countries, date } = req.body;
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
  } else {
    res.status(401).json({ message: "You are not authorized" });
  }
}

async function changeTicket(req, res) {
  if (req.body && req.query) {
    const ticket_id = req.query.ticket_id;
    const ticket = await ticketModel.findById(ticket_id);
    if (ticket) {
      if (req.user._id == ticket.userId) {
        for (let key in req.body) {
          ticket[key] = req.body[key];
        }
        await ticket.save();
        res.json(ticket);
        return;
      }
      res.send("This ticket is not yours");
      return;
    }
    res.send("ticket not found");
    return;
  }
  res.send("Not changes");
}

async function deleteTicket(req, res) {
  if (req.query) {
    const ticket_id = req.query.ticket_id;
    const ticket = await ticketModel.findById(ticket_id);
    if (ticket) {
      console.log(req.user._id, ticket.userId);
      if (req.user._id == ticket.userId) {
        await ticket.remove();
        res.send("ticket removed");
        return;
      }
      res.send("not changes");
    }
    res.send("ticket not found");
  }
}

module.exports = {
  createTicket,
  changeTicket,
  deleteTicket,
};
