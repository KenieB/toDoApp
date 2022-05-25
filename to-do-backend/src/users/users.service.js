const knex = require("../db/connection");

function create(newUser) {
  return knex("users")
    .insert(newUser)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(userEmail) {
  return knex("users").select("*").where({ email: userEmail }).first();
}

module.exports = {
  create,
  read,
};
