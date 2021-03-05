import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const PORT = 8000;

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
