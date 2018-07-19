const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const uuid = require('uuid');
const s3 = require('./awsConfig');
const config = require('./privateVariables');

// Multer Config
const multerConfig = filetypes => {
  const storage = multerS3({
    s3,
    bucket: config.BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      console.log(file);
      cb(null, `${uuid()}_${file.originalname}`);
    }
  });

  // Check File Type
  function checkFileType(file, cb) {
    const gotName = path.extname(file.originalname).toLowerCase();
    const extname = filetypes.test(gotName);
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Not a expected file!');
  }

  function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }

  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024
    },
    fileFilter
  });
  return upload;
};

module.exports = multerConfig;
