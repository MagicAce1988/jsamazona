/* eslint-disable camelcase */
import express from 'express';
import express_async_handler from 'express-async-handler';
import Product from '../models/product_model';
import { isAuth, isAdmin } from '../utils';

const product_router = express.Router();

product_router.post(
  '/',
  isAuth,
  isAdmin,
  express_async_handler(async (req, res) => {
    const product = new Product({
      name: 'sample product',
      description: 'sample description',
      category: 'sample category',
      brand: 'sample brand',
      image: '/images/product-1.jpg',
    });
    const created_product = await product.save();
    if (created_product) {
      res.status(201).send({
        message: 'Product Created',
        product: created_product,
      });
    } else {
      res.status(500).send({ message: 'Error in creating product' });
    }
  })
);

export default product_router;
