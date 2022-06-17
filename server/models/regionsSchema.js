const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  region: { type: String, required: true },
  country_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "countries",
  },
});

module.exports = mongoose.model("regions", regionSchema);
