const ticketModel = require("../Models/ticketModel");
const userModel = require("../Models/userModel");

async function addCart(req, res) {
  try {
    if (req.query) {
      const ticket_id = req.query.ticket_id;
      const ticket = await ticketModel.findById(ticket_id);
      const user = await userModel.findById(req.user._id);
      if (!ticket.cancelDate || new date(ticket.date) > new date()) {
        if (ticket.userId !== req.user._id) {
          if (ticket.countries.includes(user.country)) {
            if (
              !user.carts.includes(ticket_id) &&
              !user.orders.includes(ticket_id)
            ) {
              if (ticket.price <= user.coins) {
                user.carts.push(ticket._id);
                await user.save();
                res.json(user.carts);
                return;
              }
              res.send("insufficient coins");
              return;
            }
            res.send("It ticket already in cart or bought");
            return;
          }
          res.send("This ticket is not for your country");
          return;
        }
        res.send("Ticket date is expired");
      }
      res.send("It your ticket");
      return;
    }
    res.send("Inaccessible ticket");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function getCarts(req, res) {
  try {
    const carts = await userModel.findById(req.user._id);
    if (carts.carts.length) {
      res.send(carts.carts);
      return;
    }
    res.status(404).send("No carts found");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function removeCart(req, res) {
  try {
    if (req.query.ticket_id) {
      const ticket_id = req.query.ticket_id;
      const user = await userModel.findById(req.user._id);
      const index = user.carts.indexOf(ticket_id);
      if (index > -1) {
        user.carts.splice(index, 1);
        await user.save();
        res.json(user.carts);
        return;
      }
      res.send("Inaccessible ticket");
      return;
    }
    res.send("Inaccessible ticket");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

module.exports = {
  getCarts,
  addCart,
  removeCart,
};
