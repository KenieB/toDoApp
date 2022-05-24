exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("user_id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };