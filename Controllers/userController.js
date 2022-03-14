const userModel = require("../Models/userModel");

async function getUsers(req, res) {
  const users = await userModel.find({}, { email: 1, _id: 0 });
  res.json({ users });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user._id, { password: 0, __v: 0 });
  res.json({ user });
}

module.exports = {
  getUsers,
  getMe,
};
