const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../../.env") });

const config = {
  region: process.env.REACT_APP_AWS_REGION ?? null,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY ?? null,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ?? null,
  },
};

// Set the region and credentials for AWS
module.exports.s3Client = new S3Client(config);
