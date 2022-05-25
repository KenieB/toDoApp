const mockUsers = require("./00-mockUsers.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users").insert(mockUsers);
    });
};
