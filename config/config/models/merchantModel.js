const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
});

MerchantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Merchant", MerchantSchema);
