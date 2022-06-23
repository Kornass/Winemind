const Product = require("../models/productsSchema");
const Provider = require("../models/providersSchema");

class ProductController {
  // Add new product

  async insert(req, res) {
    let {
      sku,
      wineName: name,
      type,
      vintage,
      country,
      region,
      producer,
      price,
      description,
      img,
    } = req.body;
    sku = name + "-" + vintage + "-" + producer;
    try {
      const addProd = await Product.create({
        sku,
        name,
        type,
        country,
        region,
        vintage,
        producer,
        price,
        description,
        img,
      });
      console.log(addProd);
      res.send({ addProd });
    } catch (e) {
      console.log(e);
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
