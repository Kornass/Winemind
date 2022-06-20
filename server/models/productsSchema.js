const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  provider_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "providers",
  },
  type: { type: String, required: true },
  vintage: { type: Number, required: true },
  producer: { type: String, required: true },
  country: { type: String, required: true },
  country_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "countries",
  },
  region: { type: String, required: true },
  region_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "regions",
  },
  price: { type: Number, required: true },
  description: { type: String },
  img: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("products", productSchema);
