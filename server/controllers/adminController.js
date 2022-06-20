const Admins = require("../models/adminSchema");

class AdminController {
  //Admin LogIn
  async logIn(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }
}
module.exports = new AdminController();
