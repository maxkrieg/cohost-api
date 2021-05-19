import express from 'express';
import { eventsRouter } from './events';
import { itemsRouter } from './items';
import { usersRouter } from './users';
import { healthCheckRouter } from './health-check';

const router = express.Router();

router.use('/health-check', healthCheckRouter);
router.use('/events', eventsRouter);
router.use('/items', itemsRouter);
router.use('/users', usersRouter);

export default router;
