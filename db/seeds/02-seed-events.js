exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          title: 'Event 1 Title',
          placeId: 'place-id-1',
          startDate: knex.fn.now(),
        },
        {
          title: 'Event 2 Title',
          placeId: 'place-id-2',
          startDate: knex.fn.now(),
        },
      ]);
    });
};
