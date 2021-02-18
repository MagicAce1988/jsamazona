/* eslint-disable camelcase */
import express from 'express';
import express_async_handler from 'express-async-handler';
import Order from '../models/order_model';
import { isAuth } from '../utils';

const order_router = express.Router();

order_router.post(
  '/',
  isAuth,
  express_async_handler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
  })
);

export default order_router;
