const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const logger = require("./config/logger");

const usersRouter = require("./users/users.router");
const todoRouter = require("./todo/todo.router");

const app = express();

app.use(logger);
app.use(cors());

app.get("/", (req, res) =>
  res.status(200).json({ message: "To-Do App Server" })
);

app.use(express.json());

app.use("/users", usersRouter);
app.use("/to-do", todoRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
