exports.up = function (knex) {
    return knex.schema.createTable("toDoTags", (table) => {
      table.increments("tag_id").primary();
      table.string("tag_name").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("toDoTags");
  };