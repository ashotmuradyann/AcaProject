const users = require("../Models/userModel");

async function mailValidator(req, res, next) {
  console.log(req.body);
  if (req.body.email) {
    if (
      req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      const user = await users.findOne({ email: req.body.email });
      if (user) {
        res.status(400).send("User already exists");
        return;
      }
      next();
    } else {
      res.status(400).json("Invalid mail");
    }
  } else {
    res.status(400).json("Mail is required");
  }
}

module.exports = mailValidator;
