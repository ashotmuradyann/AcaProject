const express = require("express");
const jwtAccess = require("../Utils/jwtAccess");
const { getUsers, getMe, addCart } = require("../Controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", jwtAccess, getMe);
router.get("/addCart",jwtAccess,addCart)

module.exports = router;
