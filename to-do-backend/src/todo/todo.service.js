const knex = require("../db/connection");

function list() {
  return knex("todo_items").select("*").where({ user_id: userId });
}

module.exports = {
  list,
};
