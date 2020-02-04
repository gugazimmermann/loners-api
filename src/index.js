const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const pkg = require('../package.json');
require('dotenv').config();
const initDb = require('./database');
const routes = require('./routes');

(async () => {
  const server = await new Hapi.Server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || '0.0.0.0',
  });

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

  try {
    await initDb();

    await server.route(routes);

    await server.start();

    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.log(err);
  }
})();
