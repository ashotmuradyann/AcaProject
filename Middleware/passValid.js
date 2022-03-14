function passwordValidator(req, res, next) {
  if (req.body.password) {
    if (/\s/.test(req.body.password)) {
      res.status(400).json("Password must not contain spaces");
      return;
    } else if (req.body.password.length < 6) {
      res.status(400).json("Password must be at least 6 characters long");
      return;
    }
    next();
  } else {
    res.status(400).json("Password is required");
  }
}

module.exports = passwordValidator;
