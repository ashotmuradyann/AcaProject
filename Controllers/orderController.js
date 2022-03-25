const ticketModel = require("../Models/ticketModel");
const userModel = require("../Models/userModel");

async function getOrders(req, res) {
  try {
    const orders = await userModel.findById(req.user._id);
    if (orders.orders.length) {
      res.send(orders.orders);
      return;
    }
    res.status(404).send("No orders found");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function buyOne(req, res) {
  try {
    if (req.query.ticket_id) {
      const ticket_id = req.query.ticket_id;
      const ticket = await ticketModel.findById(ticket_id);
      const buyer = await userModel.findById(req.user._id);
      const seller = await userModel.findById(ticket.userId);
      if (ticket.countries.includes(buyer.country)) {
        if (!buyer.orders.includes(ticket_id)) {
          if (ticket.quantity > 0) {
            if (ticket.price <= buyer.coins) {
              buyer.orders.push(ticket._id);
              buyer.coins -= ticket.price;
              ticket.quantity--;
              seller.coins += ticket.price;
              if (buyer.carts.includes(ticket._id)) {
                const index = buyer.carts.indexOf(ticket._id);
                buyer.carts.splice(index, 1);
              }
              await buyer.save();
              await seller.save();
              await ticket.save();
              res.send(buyer.orders);
              return;
            }
            res.send("Insufficient coins");
            return;
          }
          res.send("This ticket is sold out");
          return;
        }
        res.send("Tickets already bought");
        return;
      }
      res.send("This ticket is not for your country");
      return;
    }
    res.send("Inaccessible ticket");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function buyAll(req, res) {
  try {
    const buyer = await userModel.findById(req.user._id);
    if (buyer.carts.length) {
      for (let i = 0; i < buyer.carts.length; i++) {
        const ticket = await ticketModel.findById(buyer.carts[i]);
        const seller = await userModel.findById(ticket.userId);
        if (ticket.quantity > 0) {
          if (ticket.price <= buyer.coins) {
            buyer.orders.push(ticket._id);
            buyer.coins -= ticket.price;
            ticket.quantity--;
            seller.coins += ticket.price;
            const index = buyer.carts.indexOf(ticket._id);
            buyer.carts.splice(index, 1);
            await seller.save();
            await ticket.save();
          }
        }
      }
      await buyer.save();
      res.json(buyer.orders);
      return;
    }
    res.status(404).send("No carts found");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function cancelOrder(req, res) {
  try {
    const buyer = await userModel.findById(req.user._id);
    if (buyer.orders.includes(req.query.order_id)) {
      const ticket = await ticketModel.findById(req.query.order_id);
      if (ticket.canCancel) {
        const seller = await userModel.findById(ticket.userId);
        buyer.coins += ticket.price;
        buyer.orders.splice(buyer.orders.indexOf(ticket._id), 1);
        seller.coins -= ticket.price;
        ticket.quantity++;
        await buyer.save();
        await seller.save();
        await ticket.save();
        res.json(buyer.orders);
        return;
      }
      res.send("This ticket cannot be cancelled");
      return;
    }
    res.status(404).send("No order found");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}
module.exports = {
  getOrders,
  buyOne,
  buyAll,
  cancelOrder,
};
