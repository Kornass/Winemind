const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/providerController");

// PROVIDER ROUTES

// REGISTER A PROVIDER
router.post("/register", controller.userRegister);

// LOGIN PROVIDER
router.post("/login", controller.userLogIn);

// DELETE PROVIDER
router.post("/delete", controller.delete);

// EDIT/UPDATE PROVIDER INFO
router.post("/:user/update", controller.userUpdate);

//SHOW ALL PROVIDERS
router.get("/all", controller.showAll);

//SHOW A CERTAIN PROVIDER'S INFORMATION
router.get("/:name/", controller.getInfo);

// TOKEN VERIFICATION
router.post("/verify_token", controller.verify_token);

module.exports = router;
