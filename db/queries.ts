import argon2 from 'argon2';
import knex from './client';
import { UserSignUpPostData } from '../interfaces';
import Knex from 'knex';

// module.exports = {
//   getAll(table: any) {
//     return knex(table);
//   },
// };

export const getAll = async (table: string) => {
  const result = await knex(table);
  return result;
};

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
}: UserSignUpPostData) => {
  try {
    const password_hash = await argon2.hash(password);
    const [userHandle] = await knex('users')
      .returning('handle')
      .insert({ email: email, password: password_hash, firstName, lastName });
    return userHandle;
  } catch (error) {
    console.error(error);
    return null;
  }
};
