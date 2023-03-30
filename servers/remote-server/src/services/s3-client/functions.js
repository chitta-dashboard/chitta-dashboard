import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from ".";
const fs = require("fs");

export const importDb = async () => {
  try {
    // Set the parameters for the S3 getObject function
    const getObjectParams = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME ?? null,
      Key: "db/db.json",
    };

    // Use the GetObjectCommand to retrieve the file from S3
    const getObjectCommand = new GetObjectCommand(getObjectParams);
    const dbResponse = await s3Client.send(getObjectCommand);
    console.log("dbResponse", dbResponse);
    if (dbResponse.data) {
      fs.writeFileSync("../../../../local-server/db.json", dbResponse.data.body);
      return true;
    } else return false;
  } catch (e) {
    console.log("Importing db from aws has failed!", e.toString());
    return false;
  }
};
