/* eslint-disable camelcase */
import express from 'express';
import express_async_handler from 'express-async-handler';
import Order from '../models/order_model';
import User from '../models/user_model';
import Product from '../models/product_model';
import { isAuth, isAdmin } from '../utils';

const order_router = express.Router();

order_router.get(
  '/summary',
  isAuth,
  isAdmin,
  express_async_handler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const daily_orders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const product_categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.send({ users, orders, daily_orders, product_categories });
  })
);

order_router.get(
  '/',
  isAuth,
  isAdmin,
  express_async_handler(async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.send(orders);
  })
);

order_router.get(
  '/mine',
  isAuth,
  express_async_handler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

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

order_router.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  express_async_handler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updated_order = await order.save();
      res.send({ message: 'Order Delivered', order: updated_order });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

order_router.delete(
  '/:id',
  isAuth,
  isAdmin,
  express_async_handler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleted_order = await order.remove();
      if (deleted_order) {
        res.send({ message: 'Order Deleted', order: deleted_order });
      } else {
        res.status(500).send({ message: 'Error in deleting the order' });
      }
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default order_router;
