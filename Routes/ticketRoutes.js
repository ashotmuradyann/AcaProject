const { Router } = require("express");
const router = Router();
const jwtAccess = require("../Utils/jwtAccess.js");

const { createTicket } = require("../Controllers/ticketController");
const { ticketValid } = require("../Middleware/ticketValid.js");

router.post("/createTicket", jwtAccess, ticketValid, createTicket);

module.exports = router;
