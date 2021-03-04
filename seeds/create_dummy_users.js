const uuid = require('uuid');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'max@gmail.com',
          handle: uuid.v4(),
          password: 'foo',
          firstName: 'Max',
          lastName: 'Krieg',
        },
        {
          email: 'peter@gmail.com',
          handle: uuid.v4(),
          password: 'bar',
          firstName: 'Peter',
          lastName: 'Krieg',
        },
        {
          email: 'ralph@gmail.com',
          handle: uuid.v4(),
          password: 'foobar',
          firstName: 'Ralph',
          lastName: 'Krieg',
        },
      ]);
    });
};
