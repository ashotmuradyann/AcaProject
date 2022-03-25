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
const { ticketValid } = require("../Middleware/ticketValid.js");

router.use(jwtAccess);

router.use("/comments", require("./commentRoutes.js"));
router.use("/filter", require("./filterRoutes.js"));

router.post("/createTicket", ticketValid, createTicket);
router.patch("/changeTicket", changeTicket);
router.get("/", getTickets);
router.get("/myTickets", getMyTickets);
router.get("/getTicket", getTicketById);
router.delete("/deleteTicket", deleteTicket);
router.get("/likeUnlike", likeUnlikeTicket);

module.exports = router;
