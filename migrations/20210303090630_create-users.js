exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable();
    table.uuid('handle').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('firstName');
    table.string('lastName');
    table.string('password').notNullable();
    table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.unique('handle');
    table.unique('email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
