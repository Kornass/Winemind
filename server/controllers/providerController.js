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
      const hash = await argon2.hash(password);
      console.log("hash ==>", hash);
      const addUser = Provider.create({
        name,
        password: hash,
        eMail,
        companyName,
        image,
      });
      res.send({ addUser });
    } catch (e) {
      res.send({ e });
    }
  }

  // User logs in
  async userLogIn(req, res) {
    let { login, password } = req.body;
    try {
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
