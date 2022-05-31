const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const logger = require("./config/logger");

const usersRouter = require("./users/users.router");
const todoRouter = require("./todo/todo.router");

const app = express();

app.use(logger);

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(express.json());

app.use("/users", usersRouter);
app.use("/to-do", todoRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
