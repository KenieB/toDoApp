const knex = require("../db/connection");

function list(viewDate) {
  return knex("toDoItems").select("*").orderBy("due-date");
}

module.exports = {
  list,
};
