const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  eMail: { type: String, required: true, unique: true },
  companyName: { type: String, required: true, unique: true },
  image: { type: String },
  active: { type: Boolean, required: true },
  // admin:  { type: Boolean, required: true },
});

module.exports = mongoose.model("providers", providerSchema);
