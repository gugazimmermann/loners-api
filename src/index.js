const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const pkg = require('../package.json');
const initDb = require('./database');
const { createServer, startServer } = require('./server');

(async () => {
  try {
    const server = await createServer();
    const swaggerOptions = {
      info: {
        title: `${pkg.description} Documentation`,
        version: pkg.version,
      },
      jsonEditor: true,
      auth: false,
    };
    await server.register([
      { plugin: Inert },
      { plugin: Vision },
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ]);
    await initDb();
    await startServer(server);
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();
