const Admin = require("../models/adminSchema");
const Provider = require("../models/providersSchema");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
require("dotenv").config({ path: "./.env" });
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
        const token = jwt.sign({ user }, jwt_secret, {
          expiresIn: "2h",
        });
        user.password = null;
        console.log(user);
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
