import argon2 from 'argon2'
import knex from './client'
import { RegisterInput } from './../validators/RegisterInput'

export const getAll = async (table: string) => {
  const result = await knex(table)
  return result
}

export const findUserByEmail = async (email: string) => {
  const result = await knex('users').where({ email }).first()
  return result
}

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
}: RegisterInput) => {
  try {
    const password_hash = await argon2.hash(password)
    const [user] = await knex('users')
      .returning(['handle', 'email', 'firstName', 'lastName'])
      .insert({ email: email, password: password_hash, firstName, lastName })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
