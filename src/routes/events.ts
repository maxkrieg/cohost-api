import express from 'express';
import { getAll } from '../db/queries';

const eventsRouter = express.Router();

eventsRouter.get('/', async (_, res) => {
  const events = await getAll('events');
  res.json(events);
});

export { eventsRouter };
