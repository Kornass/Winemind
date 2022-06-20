const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/productController");

// PRODUCT ROUTES

// ADD PRODUCT
router.get("/all", controller.allProd);

// EDIT/UPDATE PRODUCT
router.post("/update", controller.update);

// DELETE PRODUCT
router.post("/delete", controller.delete);

// ADD A PRODUCT
router.post("/add", controller.insert);

//GET ALL THE PRODUCTS FROM A PROVIDER
router.get("/:name/products", controller.allProdFromProv);

module.exports = router;
