/* eslint-disable camelcase */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import body_parser from 'body-parser';
import config from './config';
import data from './data';
import user_router from './routers/user_router';

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
  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('serve at http://localhost:5000');
});
