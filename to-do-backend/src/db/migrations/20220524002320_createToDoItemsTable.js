exports.up = function (knex) {
  return knex.schema.createTable("toDoItems", (table) => {
    table.increments("td_item_id").primary();
    //userid
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.date("due-date").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("toDoItems");
};
