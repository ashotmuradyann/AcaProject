const { Router } = require("express");
const {
  register,
  login,
  logout,
  verify,
} = require("../Controllers/authController");
const mailValid = require("../Middleware/mailValid");
const passValid = require("../Middleware/passValid");

const router = Router();

router.post("/register", mailValid, passValid, register);
router.post("/verify", verify);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
