const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function sendMail(mail, name, text) {
  const mailOptions = {
    from: "Tickets",
    to: mail,
    subject: "User registration",
    text: `Hello, dire ${name} your code is ${text}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err.message);
      return;
    }
  });
}

module.exports = sendMail;
