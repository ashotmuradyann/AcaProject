const ticketModel = require("../Models/ticketModel.js");
const commentModel = require("../Models/commentModel.js");

async function addComment(req, res) {
  try {
    if (req.query.ticket_id) {
      const ticket = await ticketModel.findById(req.query.ticket_id);
      if (ticket) {
        if (req.body.message) {
          const comment = new commentModel({
            userId: req.user._id,
            ticketId: req.query.ticket_id,
            message: req.body.message,
            date: new Date().toISOString(),
          });
          await comment.save();
          res.json(comment);
          return;
        }
        res.send("Please enter a message");
        return;
      }
      res.send("ticket not found");
      return;
    }
    res.send("not implemented");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}

async function getComments(req, res) {
  try {
    if (req.query.ticket_id) {
      const comments = await commentModel.find(
        { ticketId: req.query.ticket_id },
        { __v: 0, userId: 0, ticketId: 0, _id: 0 }
      );
      if (comments.length) {
        res.send(comments);
        return;
      }
      res.send("No comments found");
      return;
    }
    res.send("not implemented");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
}
module.exports = {
  addComment,
  getComments,
};
