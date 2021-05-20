import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import * as fs from 'fs';
import * as path from 'path';
import { ErrorInterceptor, logger } from './middleware';
import { ApolloServer } from 'apollo-server-express';
import { RequestContext } from './types';
import { redis } from './redis';

const SESSION_COOKIE_NAME = 'qid';
const SESSION_SECRET = process.env.SESSION_SECRET || '';
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const SERVER_ADDRESS = `${HOST}:${PORT}`;

const startApp = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.ts'],
    globalMiddlewares: [ErrorInterceptor, logger],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: RequestContext) => ({ req, res }),
  });

  const app = express();

  app.use(cors({ credentials: true, origin: SERVER_ADDRESS }));

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({ client: redis as any }),
      name: SESSION_COOKIE_NAME,
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  );

  app.get('/health-check', (_, res) => {
    const rawPkg = fs.readFileSync(path.join(process.cwd(), 'package.json'), {
      encoding: 'utf8',
    });
    const pkg = JSON.parse(rawPkg);
    res.send({
      server: 'up',
      version: pkg.version,
    });
  });

  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: true,
      allowedHeaders: ['Authorization', 'Content-Type', SERVER_ADDRESS],
    },
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server start at ${SERVER_ADDRESS}${server.graphqlPath} 🚀`);
  });
};

startApp();
