import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
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

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('serve at http://localhost:5000');
});
