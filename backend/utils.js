import jwt from 'jsonwebtoken';
import config from './config';

/* eslint-disable camelcase */
export const generate_token = (user) =>
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );

export const isAuth = (req, res, next) => {
  const bearer_token = req.headers.authorization;
  if (!bearer_token) {
    res.status(401).send({ message: 'Token is not supplied' });
  } else {
    const token = bearer_token.replace('Bearer ', '');
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Token is not valid for admin user' });
  }
};
