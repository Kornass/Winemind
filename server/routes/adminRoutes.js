const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/adminController");

// SUPER ADMIN ROUTES

router.post("/login", controller.logIn);

// ACTIVATE USER
router.post("/activate", controller.userActivate);

module.exports = router;
