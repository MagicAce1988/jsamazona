/* eslint-disable camelcase */
import mongoose from 'mongoose';

const product_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0.0, required: true },
    numReviews: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

const product_model = mongoose.model('Product', product_schema);

export default product_model;
