/* eslint-disable camelcase */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import body_parser from 'body-parser';
import path from 'path';
import config from './config';
import data from './data';
import user_router from './routers/user_router';
import { error_messages_map } from './constants';
import order_router from './routers/order_router';
import product_router from './routers/product_router';
import upload_router from './routers/upload_router';

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
app.use('/api/uploads', upload_router);
app.use('/api/users', user_router);
app.use('/api/products', product_router);
app.use('/api/orders', order_router);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
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

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('serve at http://localhost: ');
});
