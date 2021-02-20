/* eslint-disable camelcase */
import express from 'express';
import express_async_handler from 'express-async-handler';
import Product from '../models/product_model';
import { isAuth, isAdmin } from '../utils';

const product_router = express.Router();

product_router.get(
  '/',
  express_async_handler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

product_router.get(
  '/:id',
  express_async_handler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

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

product_router.put(
  '/:id',
  isAuth,
  isAdmin,
  express_async_handler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      const updated_product = await product.save();
      if (updated_product) {
        res.send({ message: 'Product Updated', product: updated_product });
      } else {
        res.status(500).send({ message: 'Error in updating product' });
      }
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default product_router;
