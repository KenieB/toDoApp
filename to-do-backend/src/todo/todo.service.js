const knex = require("../db/connection");

function list() {
  return knex("todo_items").select("*");
}

module.exports = {
  list,
};
