const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  eMail: { type: String, required: true, unique: true },
  companyName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("providers", providerSchema);
