// const knex = require('./knex');
import knex from './client';

// module.exports = {
//   getAll(table: any) {
//     return knex(table);
//   },
// };

export const getAll = async (table: string) => {
  const result = await knex(table);
  return result;
};
