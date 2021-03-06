const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  eMail: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: true },
});

module.exports = mongoose.model("users", adminSchema);
