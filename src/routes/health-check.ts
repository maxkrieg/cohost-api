import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', (_, res) => {
  const rawPkg = fs.readFileSync(path.join(process.cwd(), 'package.json'), {
    encoding: 'utf8',
  });
  const pkg = JSON.parse(rawPkg);
  res.send({
    server: 'up',
    version: pkg.version,
  });
});

export { healthCheckRouter };
