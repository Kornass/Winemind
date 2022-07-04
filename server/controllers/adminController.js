const Admins = require("../models/adminSchema");
const Provider = require("../models/providersSchema");
require("dotenv").config({ path: "./.env" });

const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
class AdminController {
  //Admin LogIn
  async logIn(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  // activate user
  async userActivate(req, res) {
    let { toChangeUser, active, name, eMail } = req.body;
    const default_subject = active
      ? `${name}! Your Winemind account has been activated`
      : `${name}! Your Winemind account is no longer active!`;
    const message = active
      ? `Hello ${name}!! Your account is now active! Now you can share your products with our users! Have fun! `
      : `Hello ${name}!! Your Winemind account has been desactivated`;
    const mailOptions = {
      // to: field is the destination for this outgoing email, your admin email for example
      to: `${eMail}`,
      bcc: process.env.DESTINATION_EMAIL,
      subject: default_subject,
      html: "<p>" + default_subject + "</p><p><pre>" + message + "</pre></p>",
    };
    try {
      const sendUpdate = await Provider.updateOne(
        { _id: toChangeUser },
        {
          $set: {
            active: active,
          },
        }
      );
      await transport.sendMail(mailOptions);
      res.send({ sendUpdate });
    } catch (e) {
      res.send({ e });
    }
  }
}
module.exports = new AdminController();
