/**
 * Mock Test Server
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
require("dotenv").config();
const mockTestRoute = require("./routes/mockTest");
const port = process.env.APP_PORT;
const Constants = require("./helpers/constants");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: Constants.SERVER_SUCCESS_CODE,
  })
);
app.use(helmet());
app.use(xss());
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1");
  next();
});
// app.use(limiter);
// app.set('trust proxy', 2);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});

/**
 * Databse Connection
 */
// dbConnection();

/**
 * API Routes
 */
app.get("/", (req, res) => {
  res.send("MockTest API");
});
app.use("/api/v1", mockTestRoute);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Route not found!" });
});

try {
  app.listen(port, () => {
    console.log(`Mock Test Service is running on port ${port}`);
  });
} catch (error) {
  console.error("Error starting the User Service", error.message);
}
