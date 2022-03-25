const ticketModel = require("../Models/ticketModel");

async function findByCountry(req, res) {
  try {
    if (req.query.country) {
      const tickets = await ticketModel.find({ countries: req.query.country });
      res.send(tickets);
      return;
    }
    res.status(404).send("Ticket in this country not found");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

async function findByLikes(req, res) {
  try {
    const tickets = await ticketModel.find(
      {},
      { __v: 0, likes: 0, canCancel: 0, cancelDate: 0 }
    );
    tickets.sort((a, b) => {
      return b.likesCount - a.likesCount;
    });
    res.send(tickets);
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

async function findByPrice(req, res) {
  try {
    const tickets = await ticketModel.find(
      {},
      { __v: 0, likes: 0, canCancel: 0, cancelDate: 0 }
    );
    tickets.sort((a, b) => {
      return b.price - a.price;
    });
    res.send(tickets);
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

module.exports = {
  findByCountry,
  findByLikes,
  findByPrice,
};
