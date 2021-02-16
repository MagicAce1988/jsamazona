/* eslint-disable camelcase */
import express from 'express';
import express_async_handler from 'express-async-handler';
import User from '../models/user_model';
import { generate_token } from '../utils';

const user_router = express.Router();

user_router.get(
  '/create_admin',
  express_async_handler(async (req, res) => {
    try {
      const user = new User({
        name: 'admin',
        email: 'magicace1988@gmail.com',
        password: 'jsamazona',
        isAdmin: true,
      });
      const created_user = await user.save();
      res.send(created_user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

user_router.post(
  '/signin',
  express_async_handler(async (req, res) => {
    const sign_in_user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!sign_in_user) {
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      res.send({
        _id: sign_in_user._id,
        name: sign_in_user.name,
        email: sign_in_user.email,
        isAdmin: sign_in_user.isAdmin,
        token: generate_token(sign_in_user),
      });
    }
  })
);

export default user_router;
