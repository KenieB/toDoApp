const knex = require("../db/connection");

function list(viewDate) {
  return knex("todo_items").select("*");
}

module.exports = {
  list,
};
