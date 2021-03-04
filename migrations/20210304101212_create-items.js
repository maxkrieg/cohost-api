exports.up = function (knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.integer('quantity').defaultTo(1);
    table
      .integer('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .integer('eventId')
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('cascade');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('items');
};
