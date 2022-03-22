const { Router } = require("express");
const router = Router();
const jwtAccess = require("../Utils/jwtAccess.js");

const {
  createTicket,
  getTickets,
  changeTicket,
  deleteTicket,
  getTicketById,
  likeUnlikeTicket,
  getMyTickets,
} = require("../Controllers/ticketController");
const { addComment, getComments } = require("../Controllers/messageController");
const { ticketValid } = require("../Middleware/ticketValid.js");

router.use(jwtAccess);

router.post("/createTicket", ticketValid, createTicket);
router.post("/changeTicket", changeTicket);
router.get("/", getTickets);
router.get("/myTickets", getMyTickets);
router.get("/getTicket", getTicketById);
router.get("/deleteTicket", deleteTicket);
router.get("/likeUnlike", likeUnlikeTicket);

router.post("/addComment", addComment);
router.get("/getComments", getComments);

module.exports = router;
