/* eslint-disable camelcase */
import mongoose from 'mongoose';

const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

const user_model = mongoose.model('User', user_schema);

export default user_model;
