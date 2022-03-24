const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const random = require("random");
const userModel = require("../Models/userModel");
const sendMail = require("../Utils/mailAccess");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }
    let code = random.int(100000, 999999);
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hash,
      code,
    });
    await newUser.save();
    sendMail(email, name, code);
    res.send(`Check your email ${email}, Your _id is ${newUser._id}`);
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

async function verify(req, res) {
  try {
    const code = req.body.code;
    const user = await userModel.findOne({ _id: req.query._id });
    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    if (user.verified) {
      res.status(409).send("User already verified");
      return;
    }
    if (user.code === code) {
      user.code = null;
      user.verified = true;
      await user.save();
      res.send("Account verified.");
      return;
    }
    res.status(401).send("Incorrect code");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send("Incorrect password");
      return;
    }
    if (!user.verified) {
      res.status(401).send("User not verified. Check your email");
      return;
    }
    res.cookie(
      "token",
      jwt.sign(
        { _id: user._id },
        process.env.SECRET,
        {
          expiresIn: "30m",
        },
        {
          httpOnly: true,
        }
      )
    );
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.send("Logged out");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
}

module.exports = {
  register,
  login,
  logout,
  verify,
};
