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
      provider_id,
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
        provider_id,
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
    let { _id } = req.body;
    try {
      const removed = await Product.deleteOne({ _id });
      res.send({ removed });
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
      const allProd = await Product.find();
      res.send(allProd);
    } catch (e) {
      res.send({ e });
    }
  }
  // Single product
  async singleProduct(req, res) {
    let { id } = req.params;
    try {
      const singleProd = await Product.find({ id });
      res.send({ ok: true, data: singleProd });
    } catch (e) {
      res.send(e);
    }
  }
  // Show all products from one provider
  async allProdFromProv(req, res) {
    let { id } = req.params;
    try {
      let prov = await Provider.findOne({ _id: id });
      const products = await Product.find({ provider_id: prov._id });
      res.send(products);
    } catch (e) {
      res.send({ e });
    }
  }
}
module.exports = new ProductController();
