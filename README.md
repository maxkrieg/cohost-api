# express-typescript-server-starter
This is a starter template for a Node.js server using Express and TypeScript.

It uses `ts-node` for compilation and `ts-node-dev` for compilation in "watch" mode.  It has some middleware set up for JSON parsing, cookie parsing, and logging, but feel free to swap that out.

Under the `/api` routing layer there is a health check endpoint at `/api/health-check` that grabs the current `package.json` version number.
