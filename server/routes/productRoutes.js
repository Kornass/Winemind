const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/productController");

router.get("product/", controller.allProd);

router.p[ost];
