const Product = require("../models/providersSchema");

class ProviderController {
  // Register account
  async userRegister(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  // User logs in
  async userLogIn(req, res) {
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
