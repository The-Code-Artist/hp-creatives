const nodemailer = require("nodemailer");

require("dotenv").config();

// Store SMTP related secrets in an object.
const auth = {
  username: process.env.MAIL_USER,
  password: process.env.MAIL_PASS
};

// Define a transport so that emails could be sent.
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 25,
  secure: false,
  auth: {
    user: auth.username,
    pass: auth.password
  }
});

/** Sends an email using the ndemailer transport object */
const sendEmail = (email, subject, message, callback) => {
  // Store all mail options in an object.
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: "web@localhost.io",
    subject: subject,
    html: message
  };

  // Using the transport defined, send the email.
  transport.sendMail(mailOptions, (err, data) => {
    if (err)
      callback(error, null);
    else
      callback(null, data);
  });
}

module.exports = sendEmail;
