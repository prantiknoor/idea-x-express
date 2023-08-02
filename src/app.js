const express = require("express");
const router = require("./routes");
const { globalErrorHandler, notFoundHandler } = require("./error-handlers");

const app = express();

app.use(require("morgan")("dev"));

app.use("/api", router);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
