const express = require("express");
const jwtAccess = require("../Utils/jwtAccess");
const { getUsers, getMe } = require("../Controllers/userController");

const router = express.Router();

router.use(jwtAccess);

router.use("/carts", require("./cartRoutes.js"));
router.use("/orders", require("./orderRoutes.js"));

router.get("/", getUsers);
router.get("/me", getMe);

module.exports = router;
