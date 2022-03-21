const userModel = require("../Models/userModel");
const ticketModel = require("../Models/ticketModel")

async function getUsers(req, res) {
  const users = await userModel.find({}, { email: 1, _id: 0 });
  res.json({ users });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user._id, { password: 0, __v: 0 });
  res.json({ user });
}

async function addCart(req,res) {
  if(req.query) {
    const ticket_id = req.query.ticket_id;
    const ticket = await ticketModel.findById(ticket_id);
    if ( ticket.price <= req.user.coins){
      const user = await userModel.findById(req.user._id);
      user.carts.push(ticket._id)
      await user.save()
      res.json( user.carts);
      return;
    }
    res.send("insufficient coins")
  }
  res.send("Inaccessible ticket")
}

module.exports = {
  getUsers,
  getMe,
  addCart,
};
