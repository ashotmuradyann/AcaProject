const { Router } = require("express");
const router = Router();
const jwtAccess = require("../Utils/jwtAccess.js");

const {
  createTicket,
  changeTicket,
  deleteTicket,
} = require("../Controllers/ticketController");
const { ticketValid } = require("../Middleware/ticketValid.js");

router.post("/createTicket", jwtAccess, ticketValid, createTicket);
router.post("/changeTicket", jwtAccess, changeTicket);
router.get("/deleteTicket", jwtAccess, deleteTicket);

module.exports = router;
