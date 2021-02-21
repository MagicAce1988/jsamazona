/* eslint-disable camelcase */
import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { isAdmin, isAuth } from '../utils';
import config from '../config';

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ID,
  secretAccessKey: config.AWS_SECRET,
});

const storage = multer.memoryStorage({
  destination(req, file, cb) {
    cb(null, '');
  },
});

const upload = multer({ storage }).single('image');

const upload_router = express.Router();

upload_router.post('/', isAuth, isAdmin, upload, (req, res) => {
  const myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
  };
  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send({ image: data.Location });
  });
});

export default upload_router;
