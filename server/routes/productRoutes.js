const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/productController");

// PRODUCT ROUTES

// ALL PRODUCTS
router.get("/all", controller.allProd);

// EDIT/UPDATE PRODUCT
router.post("/update", controller.update);

// DELETE PRODUCT
router.post("/delete", controller.delete);

// ADD A PRODUCT
router.post("/add", controller.insert);

// GET ONE PRODUCT WITH SPECIFIED ID
router.post('/single/:id', controller.singleProduct)

//GET ALL THE PRODUCTS FROM A PROVIDER
router.get("/:id/products", controller.allProdFromProv);

module.exports = router;
