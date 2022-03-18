const ticketModel = require("../models/ticketModel");

async function changeTicket(req, res) {
  if (req.body) {
    const ticket_id = req.query.ticket_id;
    const ticket = await ticketModel.findById(ticket_id);
    if (req.user._id == ticket.user_id) {
      for (let key in req.body) {
        ticket[key] = req.body[key];
      }
      await ticket.save();
      res.json(ticket);
      return;
    }
    res.send("this ticket is not yours");
  }
  res.send("not changes");
}

async function deleteTicket(req, res) {
  if (req.query) {
    const ticket_id = req.query.ticket_id;
    const ticket = await ticketModel.find({ _id: ticket_id });
    await ticket.remove();
    res.send("ticket removed");
    return;
  }
  res.send("not changes");
}

module.exports = {
  changeTicket,
  deleteTicket,
};
