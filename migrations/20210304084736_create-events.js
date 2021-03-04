exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('placeId');
    table.timestamp('startDate').notNullable();
    table.timestamp('endDate');
    table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
