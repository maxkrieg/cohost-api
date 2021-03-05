import express from 'express';
import { getAll } from '../db/queries';

const itemsRouter = express.Router();

itemsRouter.get('/', async (_, res) => {
  const items = await getAll('items');
  res.json(items);
});

export { itemsRouter };
