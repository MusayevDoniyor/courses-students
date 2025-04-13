const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

module.exports = app;
