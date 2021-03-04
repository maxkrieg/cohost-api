import express from 'express';

const userRouter = express.Router();

userRouter.get('/1', (_, res) => {
  res.send({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john-doe@gmail.com',
  });
});

export { userRouter };
