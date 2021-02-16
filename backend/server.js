/* eslint-disable camelcase */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import body_parser from 'body-parser';
import config from './config';
import data from './data';
import user_router from './routers/user_router';
import { error_messages_map } from './constants';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error.reason);
  });

const app = express();

app.use(cors());
app.use(body_parser.json());
app.use('/api/users', user_router);
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  let error_message = err.message;
  Object.keys(error_messages_map).forEach((error) => {
    if (error_message.includes(error)) {
      error_message = error_messages_map[error];
    }
  });
  if (
    error_message.includes('Path `password`') &&
    error_message.includes('is shorter than the minimum allowed length')
  ) {
    error_message = 'Password must be at least 6 characters long';
  }
  res.status(status).send({ message: error_message });
});

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('serve at http://localhost:5000');
});
