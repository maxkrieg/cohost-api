import express from 'express';
import { userRouter } from './user';
import { healthCheckRouter } from './health-check';

const router = express.Router();

router.use('/health-check', healthCheckRouter);
router.use('/users', userRouter);

export default router;
