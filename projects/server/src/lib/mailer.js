const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
  host: "smtp.gmail.com",
  service: "gmail",
});

const mailer = async ({ subject, html, to, text }) => {
  console.log(process.env.NODE_MAILER_EMAIL);
  await transport.sendMail({
    subject: subject || "subject email",
    html: html || "<h1>This is sent through express API</h1>",
    to: to || "donnysaputra501@gmail.com",
    text: text || "nodemailer",
  });
};

module.exports = mailer;
