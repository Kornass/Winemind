const Admin = require("../models/adminSchema");
const Provider = require("../models/providersSchema");
const Product = require("../models/productsSchema");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
require("dotenv").config({ path: "./.env" });
const jwt_secret = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

class ProviderController {
  // Register account
  async userRegister(req, res) {
    let { name, password, eMail, companyName, image, admin } = req.body;
    const default_subject = `New provider ${name} register`;
    const message = `Hello ${name}!! You signed up succesfully. Now your account is waiting for activation. You will get a confirmation e-mail when your account is going to be active. We looking forward to cooperate with you!`;
    const mailOptions = {
      // to: field is the destination for this outgoing email, your admin email for example
      to: `${eMail}`,
      bcc: process.env.DESTINATION_EMAIL,
      subject: default_subject,
      html: "<p>" + default_subject + "</p><p><pre>" + message + "</pre></p>",
    };
    try {
      const user = await Provider.findOne({ name });
      if (user) return res.send({ ok: false, message: "User already exist!" });
      const email = await Provider.findOne({ eMail });
      if (email)
        return res.send({
          ok: false,
          message:
            "There is already a user registered with this e-mail adress!",
        });
      const hash = await argon2.hash(password);
      console.log("hash ==>", hash);
      await Provider.create({
        name,
        password: hash,
        eMail,
        companyName,
        image,
        active: false,
        admin,
      });
      await transport.sendMail(mailOptions);
      res.send({ ok: true, message: "User successfully registered!" });
    } catch (e) {
      res.send({ ok: false, e });
    }
  }

  // User logs in
  async userLogIn(req, res) {
    let { login, password } = req.body;

    try {
      let user = await Admin.findOne({
        $or: [{ eMail: login }, { name: login }],
      });
      if (!user)
        user = await Provider.findOne({
          $or: [{ eMail: login }, { name: login }],
        });
      if (!user)
        return res.send({
          ok: false,
          message: "Username/email incorrect",
        });
      const match = await argon2.verify(user.password, password);
      if (match) {
        const token = jwt.sign({ _id: user._id }, jwt_secret, {
          expiresIn: "2h",
        });
        user.password = null;
        res.send({ ok: true, message: "Welcome back", user, token });
        console.log(token);
      } else return res.send({ ok: false, message: "invalid data provided" });
    } catch (e) {
      console.log(e);
      res.send({ ok: false, e });
    }
  }
  // Token verification
  verify_token(req, res) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    jwt.verify(token, jwt_secret, (err, succ) => {
      err
        ? res.send({ ok: false, message: "something went wrong" })
        : res.send({ ok: true, succ });
    });
  }
  // GET LOGGED USER INFO
  async loggedInfo(req, res) {
    let { id } = req.params;
    try {
      const logged = await Provider.findOne({ _id: id });
      res.send({ logged });
    } catch (e) {
      res.send({ e });
    }
  }

  //Delete user
  async delete(req, res) {
    let { _id } = req.body;
    try {
      const userProd = await Product.deleteMany({ provider_id: _id });
      const removed = await Provider.deleteOne({ _id });
      res.send({ removed });
    } catch (e) {
      res.send({ e });
    }
  }

  // updates/edits user information
  async userUpdate(req, res) {
    let { oldUser, updatedUser } = req.body;
    try {
      const sendUpdate = await Provider.updateOne(
        { name: oldUser },
        {
          $set: {
            name: updatedUser.name,
            eMail: updatedUser.eMail,
            companyName: updatedUser.companyName,
          },
        }
      );
      res.send({ sendUpdate });
    } catch (e) {
      res.send({ e });
    }
  }

  // Show all providers
  async showAll(req, res) {
    try {
      const allProviders = await Provider.find({});
      res.send({ allProviders });
    } catch (e) {
      res.send({ e });
    }
  }

  // Show information from a certain provider
  async getInfo(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }
}
module.exports = new ProviderController();
