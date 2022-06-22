const providersSchema = require("../models/providersSchema");
const Provider = require("../models/providersSchema");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const jwt_secret = process.env.JWT_SECRET;

class ProviderController {
  // Register account
  async userRegister(req, res) {
    let { name, password, eMail, companyName, image } = req.body;

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
      });
      res.send({ ok: true, message: "User successfully registered!" });
    } catch (e) {
      res.send({ ok: false, e });
    }
  }

  // User logs in
  async userLogIn(req, res) {
    let { login, password } = req.body;

    try {
      const user = await Provider.findOne({ name: login });
      const email = await Provider.findOne({ eMail: login });
      if (email || user)
        return res.send({
          ok: true,
          message: "You are logged in!",
        });
      const match = await argon2.verify(user.password, password);
      const match1 = await argon2.varify(email.password, password);
      if (match || match1) {
        // logged in
      }
    } catch (e) {
      res.send({ e });
    }
  }

  //Delete user
  async delete(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  // updates/edits user information
  async userUpdate(req, res) {
    try {
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
