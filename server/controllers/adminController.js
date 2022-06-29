const Admins = require("../models/adminSchema");
const Provider = require("../models/providersSchema");

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
    let { toChangeUser, active } = req.body;
    try {
      const sendUpdate = await Provider.updateOne(
        { _id: toChangeUser },
        {
          $set: {
            active: !active,
          },
        }
      );
      res.send({ sendUpdate });
    } catch (e) {
      res.send({ e });
    }
  }
}
module.exports = new AdminController();
