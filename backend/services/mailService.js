const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.senderEmail,
    pass: config.mail.senderPass,
  },
});

async function sendMail({ to, subject, html, attachments }) {
  const mailOptions = {
    from: `${config.mail.defaultFromName} <${config.mail.senderEmail}>`,
    to,
    subject,
    html,
    attachments,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { transporter, sendMail };


