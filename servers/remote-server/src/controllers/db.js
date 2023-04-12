const { GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../services/s3-client");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../../.env") });
const fs = require("fs");

// Set the parameters for the S3 Get and Put functions
const dbParams = {
  Bucket: process.env.REACT_APP_AWS_BUCKET_NAME ?? null,
  Key: "db/db.json",
};

// Locating local db path
const localDbPath = path.resolve(__dirname, "../../../local-server/db.json");

// Utility function to convert a stream to a buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

module.exports.importdb = async (req, res) => {
  try {
    // Use the GetObjectCommand to retrieve the file from S3
    const getObjectCommand = new GetObjectCommand(dbParams);
    const dbResponse = await s3Client.send(getObjectCommand);
    const buffer = await streamToBuffer(dbResponse.Body);

    if (dbResponse.Body) {
      fs.writeFileSync(localDbPath, buffer);
      return res.status(200).send({
        status: true,
        message: "Db imported successfully.",
      });
    } else return res.status(204).send({ status: false, error: "No content to import." });
  } catch (error) {
    console.log(error.toString());
    res.status(400).send({ status: false, error: error.toString() });
  }
};

module.exports.exportdb = async (req, res) => {
  try {
    if (fs.existsSync(localDbPath)) {
      const fileContent = fs.readFileSync(localDbPath);
      const parsedFileContent = { ...JSON.parse(fileContent.toString()) };
      parsedFileContent.notification = [];
      const buffer = Buffer.from(JSON.stringify(parsedFileContent));

      const putObjectParams = {
        ...dbParams,
        Body: buffer,
        ContentType: "application/json",
      };
      // Use the S3 putObject command to upload the file to S3
      s3Client
        .send(new PutObjectCommand(putObjectParams))
        .then(() => {
          res.status(200).send({
            status: true,
            message: "Db exported successfully.",
          });
        })
        .catch((error) => {
          res.status(400).send({ status: false, error: error.toString() });
        });
    } else {
      return res.status(204).send({
        status: false,
        error: "No content to export",
      });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error.toString() });
  }
};
