import express from 'express';
import { getAll, createUser } from '../db/queries';

const usersRouter = express.Router();

usersRouter.get('/', async (_, res) => {
  const users = await getAll('users');
  res.json(users);
});

usersRouter.post('/signup', async (req, res) => {
  const user = await createUser(req.body);
});

export { usersRouter };
