const knex = require("../db/connection");

function list(userId) {
  return knex("todo_items")
    .select("*")
    .where({ user_id: userId })
    .orderBy("due-date", "asc");
}

function create(newItem) {
  return knex("todo_items")
    .insert(newItem)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(userItemIds) {
  return knex("todo_items")
    .select("*")
    .where({ td_item_id: userItemIds.itemId, user_id: userItemIds.userId })
    .first();
}

function updateTags(tagsUpdate) {
  return knex("todo_items")
    .select("*")
    .where({ td_item_id: tagsUpdate.itemId })
    .update({
      tags: knex.raw("array_append(tags, ?)", [tagsUpdate.newTag]),
    })
    .returning("*");
}

function destroy(itemId) {
  return knex("todo_items").where({ td_item_id: itemId }).del();
}

module.exports = {
  list,
  create,
  read,
  updateTags,
  delete: destroy,
};
