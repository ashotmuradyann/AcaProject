const ticketModel = require("../models/ticketModel.js");
const commentModel = require("../models/commentModel.js");

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
      const ticket = await ticketModel.findById(newTicket._id, {
        __v: 0,
        likes: 0,
      });
      res.send(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "You are not authorized" });
  }
}

async function getTickets(req, res) {
  try {
    const tickets = await ticketModel.find(
      { userId: { $ne: req.user._id } },
      { name: 1, description: 1 }
    );
    if (tickets.length) {
      tickets.filter((id) => {
        id.userId != req.user._id;
        console.log(id);
      });
      res.send(tickets);
      return;
    }
    res.status(404).send("No tickets found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMyTickets(req, res) {
  try {
    const tickets = await ticketModel.find(
      { userId: req.user._id },
      { __v: 0 }
    );
    if (tickets.length) {
      res.send(tickets);
      return;
    }
    res.status(404).send("No tickets found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTicketById(req, res) {
  try {
    const ticket = await ticketModel.findById(req.query.ticket_id, {
      __v: 0,
      likes: 0,
    });
    if (ticket) {
      res.send(ticket);
      return;
    }
    res.status(404).send("No ticket found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function changeTicket(req, res) {
  if (req.body && req.query) {
    const ticket_id = req.query.ticket_id;
    const ticket = await ticketModel.findById(ticket_id, { __v: 0, likes: 0 });
    if (ticket) {
      if (req.user._id == ticket.userId) {
        for (let key in req.body) {
          if (key == "likes" || key == "likesCount") {
            continue;
          }
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
      res.send("Ticket not yours");
      return;
    }
    res.send("ticket not found");
  }
}

async function likeUnlikeTicket(req, res) {
  if (req.query) {
    const ticket = await ticketModel.findById(req.query.ticket_id);
    if (ticket) {
      if (ticket.likes.includes(req.user._id)) {
        ticket.likes = ticket.likes.filter((id) => id != req.user._id);
        ticket.likesCount--;
      } else {
        ticket.likes.push(req.user._id);
        ticket.likesCount++;
      }
      await ticket.save();
      res.json(ticket);
      return;
    }
    res.send("ticket not found");
  }
}

module.exports = {
  createTicket,
  getTickets,
  getMyTickets,
  getTicketById,
  changeTicket,
  deleteTicket,
  likeUnlikeTicket,
};
