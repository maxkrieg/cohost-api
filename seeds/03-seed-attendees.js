exports.seed = async (knex) => {
  // Deletes ALL existing entries
  const users = await knex('users');
  const events = await knex('events');
  return knex('attendees')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('attendees').insert([
        { userId: users[0].id, eventId: events[0].id, type: 'host' },
        { userId: users[1].id, eventId: events[0].id, type: 'guest' },
        { userId: users[2].id, eventId: events[0].id, type: 'guest' },

        { userId: users[0].id, eventId: events[1].id, type: 'guest' },
        { userId: users[1].id, eventId: events[1].id, type: 'host' },
        { userId: users[2].id, eventId: events[1].id, type: 'guest' },
      ]);
    });
};
