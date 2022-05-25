const mockTodoItems = require("./01-mockTodoItems.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE todo_items RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("todo_items").insert(mockTodoItems);
    });
};
