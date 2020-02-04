const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const pkg = require('../package.json');
require('dotenv').config();
const initDb = require('./database');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
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

  await initDb();

  await server.route(routes);

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
