import { S3Client } from "@aws-sdk/client-s3";

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME ?? null,

  region: process.env.REACT_APP_AWS_REGION ?? null,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY ?? null,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ?? null,
  },
};

// Set the region and credentials for AWS
export const s3Client = new S3Client(config);
