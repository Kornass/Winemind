const Product = require("../models/productsSchema");

class ProductController {
  // Add new product
  async insert(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  // Deletes product
  async delete(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  //Updates/edits product
  async update(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  // Show all products
  async allProd(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }

  // Show all products from one provider
  async allProdFromProv(req, res) {
    try {
    } catch (e) {
      res.send({ e });
    }
  }
}
module.exports = new ProductController();
