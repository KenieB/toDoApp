const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const logger = require("./config/logger");

const todoItemsRouter = require("./todoItems/todoItems.router");
const itemTagsRouter = require("./itemTags/itemTags.router");

const app = express();

app.use(logger);
app.use(cors());
/*
app.use(express.static(path.join(__dirname, "..", "..", "to-do-client", "dist")));
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "..", "to-do-client", "dist", "index.html"))
);
*/
app.use(express.json());

app.use("/to-do", todoItemsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
