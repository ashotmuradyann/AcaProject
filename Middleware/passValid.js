function passwordValidator(req, res, next) {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

module.exports = passwordValidator;
