const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const booksRouter = require("../routes/books.route");
const authorsRouter = require("../routes/authors.route");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

module.exports = app;
