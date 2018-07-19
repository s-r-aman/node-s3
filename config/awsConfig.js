const aws = require('aws-sdk');
const {
  I_AM_KEY_ID: accessKeyId,
  I_AM_KEY_SECRET: secretAccessKey,
  BUCKET_NAME: Bucket
} = require('./privateVariables');

aws.config.update({
  secretAccessKey,
  accessKeyId
});

module.exports = new aws.S3();
