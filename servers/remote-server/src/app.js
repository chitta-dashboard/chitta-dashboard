const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const farmersRoute = require("./routes/farmers");
const dbRoute = require("./routes/db");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

// helmet() provides additional security to our application by adding headers in response
app.use(helmet());

// Middleware to parse JSON and form data or multipart/form-data request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(publicDirectoryPath));
app.use(
  cors({
    origin: "*",
  }),
);

// Routes
app.use("/dbjson", dbRoute);
app.use("/farmers", farmersRoute);

// Error Handling
app.use(function (err, req, res, next) {
  // jshint ignore: line
  res.status(err.status || 500).send({
    status: "error",
    errors: err.body ? err.body.errors : "",
    message: err.message,
  });
});

module.exports = app;
