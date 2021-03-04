exports.up = function (knex) {
  return knex.schema.createTable('attendees', (table) => {
    table.increments();
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
    table
      .enu('type', ['host', 'guest'], {
        useNative: true,
        enumName: 'attendee_type',
      })
      .notNullable()
      .defaultTo('guest');
    table.unique(['userId', 'eventId']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('attendees');
  await knex.raw('DROP TYPE attendee_type');
};
