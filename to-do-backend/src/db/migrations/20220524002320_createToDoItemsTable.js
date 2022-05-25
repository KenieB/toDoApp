exports.up = function (knex) {
  return knex.schema.createTable("todo_items", (table) => {
    table.increments("td_item_id").primary();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("cascade");
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.date("due-date").notNullable();
    table.specificType("tags", "text[]");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todo_items");
};
