/* eslint-disable camelcase */
import express from 'express';
import express_async_handler from 'express-async-handler';
import Order from '../models/order_model';
import { isAuth } from '../utils';

const order_router = express.Router();

order_router.get(
  '/:id',
  isAuth,
  express_async_handler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

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

order_router.put(
  '/:id/pay',
  isAuth,
  express_async_handler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment.paymentResult = {
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
        orderId: req.body.orderId,
      };
      const updated_order = await order.save();
      res.send({ message: 'Order Paid', order: updated_order });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default order_router;
