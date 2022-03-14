const express = require("express");
const jwtAccess = require("../Utils/jwtAccess");
const { getUsers, getMe } = require("../Controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", jwtAccess, getMe);

module.exports = router;
