const ticketModel = require("../Models/ticketModel.js");
const commentModel = require("../Models/commentModel.js");

async function createTicket(req, res) {
  if (req.user) {
    const { name, description, price, quantity, countries, date, canCancel } =
      req.body;
    try {
      if (new Date(date) < new Date()) {
        res
          .status(400)
          .json({ message: "Date must be in future. Date format 2022-10-16" });
        return;
      }
      const newTicket = new ticketModel({
        name,
        description,
        price,
        quantity,
        countries,
        date,
        userId: req.user._id,
      });
      if (canCancel === true) {
        newTicket.canCancel = canCancel;
      }
      await newTicket.save();
      const ticket = await ticketModel.findById(newTicket._id, {
        __v: 0,
        likes: 0,
      });
      res.send(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
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
      });
      res.send(tickets);
      return;
    }
    res.status(404).send("No tickets found");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
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
    console.log(error.message);
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
    console.log(error.message);
  }
}

async function changeTicket(req, res) {
  try {
    if (req.body && req.query) {
      const ticket_id = req.query.ticket_id;
      const ticket = await ticketModel.findById(ticket_id, {
        __v: 0,
        likes: 0,
      });
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
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function deleteTicket(req, res) {
  try {
    if (req.query) {
      const ticket_id = req.query.ticket_id;
      const ticket = await ticketModel.findById(ticket_id);
      if (ticket) {
        if (req.user._id == ticket.userId) {
          const comments = await commentModel.find({ ticketId: ticket_id });
          if (comments.length) {
            comments.forEach(async (comment) => {
              await comment.remove();
            });
          }
          await ticket.remove();
          res.send("ticket removed");
          return;
        }
        res.send("Ticket not yours");
        return;
      }
      res.send("ticket not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function likeUnlikeTicket(req, res) {
  try {
    if (req.query) {
      const ticket = await ticketModel.findById(req.query.ticket_id);
      if (ticket) {
        if (ticket.likes.includes(req.user._id)) {
          ticket.likes = ticket.likes.filter((id) => id != req.user._id);
          ticket.likesCount--;
          res.send("Ticket disliked");
        } else {
          ticket.likes.push(req.user._id);
          ticket.likesCount++;
          res.send("Ticket liked");
        }
        await ticket.save();
        return;
      }
      res.send("ticket not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
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
