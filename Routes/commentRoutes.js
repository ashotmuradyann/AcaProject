const { Router } = require("express");
const router = Router();

const {
  addComment,
  getComments,
  changeComment,
  deleteComment,
} = require("../Controllers/messageController");

router.post("/addComment", addComment);
router.get("/getComments", getComments);
router.patch("/changeComment", changeComment);
router.delete("/deleteComment", deleteComment);

module.exports = router;
