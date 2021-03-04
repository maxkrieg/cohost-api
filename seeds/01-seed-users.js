const uuid = require('uuid');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'user1@gmail.com',
          handle: uuid.v4(),
          password: 'user-1-password',
          firstName: 'User1First',
          lastName: 'User1Last',
        },
        {
          email: 'user2@gmail.com',
          handle: uuid.v4(),
          password: 'user-2-password',
          firstName: 'User2First',
          lastName: 'User2Last',
        },
        {
          email: 'user3@gmail.com',
          handle: uuid.v4(),
          password: 'user-3-password',
          firstName: 'User3First',
          lastName: 'User3Last',
        },
      ]);
    });
};
