exports.seed = async (knex) => {
  // Deletes ALL existing entries
  const attendees = await knex('attendees');
  const items = attendees.map((attendee, i) => ({
    title: `Item ${i + 1}`,
    userId: attendee.userId,
    eventId: attendee.eventId,
  }));
  return knex('items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert(items);
    });
};
