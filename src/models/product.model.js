const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0, validate: Number.isInteger },
    brand: { type: String, required: true, trim: true },
    inStock: { type: Boolean, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
