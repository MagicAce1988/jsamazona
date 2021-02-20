/* eslint-disable camelcase */
import express from 'express';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

const upload_router = express.Router();

upload_router.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({ image: `${req.file.path}` });
});

export default upload_router;
