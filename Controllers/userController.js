const userModel = require("../Models/userModel");

async function getUsers(req, res) {
  console.log(req.ip);
  try {
    const users = await userModel.find({}, { email: 1, name: 1, _id: 0 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user._id, {
      password: 0,
      __v: 0,
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

module.exports = {
  getUsers,
  getMe,
};
