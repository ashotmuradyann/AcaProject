const { Router } = require("express");
const {
  register,
  login,
  logout,
  verify,
} = require("../Controllers/authController");
const validMail = require("../Middleware/validMail");
const passVal = require("../Middleware/passValid");

const router = Router();

router.post("/register", validMail, passVal, register);
router.post("/verify", verify);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
