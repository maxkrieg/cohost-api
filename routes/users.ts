import express from 'express';
import { getAll } from '../db/queries';

const usersRouter = express.Router();

usersRouter.get('/', async (_, res) => {
  const users = await getAll('users');
  res.json(users);
});

export { usersRouter };
