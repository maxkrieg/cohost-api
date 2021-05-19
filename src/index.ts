import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { ErrorInterceptor, logger } from './middleware';
import { ApolloServer } from 'apollo-server-express';
import { RequestContext } from './types';

// const PORT = 8000;

const HOST = process.env.HOST
const PORT = process.env.PORT
const SERVER_ADDRESS = `${HOST}:${PORT}`

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (_, res) => res.send('Express + TypeScript Server'));
app.use('/api', routes);

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (res.locals.error = req.app.get('env') === 'development' ? err : {}),
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

const main = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.ts'],
    globalMiddlewares: [ErrorInterceptor, logger],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res}: RequestContext) => ({ req, res})
  })

  const app = express()

  app.use(cors({ credentials: true, origin: }))
};
