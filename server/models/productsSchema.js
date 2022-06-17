const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  vintage: { type: Number, required: true },
  provider: { type: String, required: true },
  origin: { type: String, required: true },
  region: { type: String, required: true },
  price: { type: Number, requided: true },
  description: { type: String },
  img: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("product", productSchema);
