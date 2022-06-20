const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/adminController");

// SUPER ADMIN ROUTES

router.post("/login", controller.logIn);

module.exports = router;
