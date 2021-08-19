const mongoose = require("mongoose");

const GuesthousesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Guesthouses", GuesthousesSchema);
