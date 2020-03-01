const Hapi = require('hapi');
const authBasic = require('hapi-auth-basic');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const handlebars = require('handlebars');
const validate = require('./auth');
const pkg = require('../../package.json');
const routes = require('../routes');
require('dotenv').config();

const createServer = async (serverPort = 80) => {
  const server = await new Hapi.Server({
    port: process.env.SERVER_PORT || serverPort,
    host: process.env.SERVER_HOST || '0.0.0.0',
  });
  return server;
};

const startServer = async (server) => {
  const swaggerOptions = {
    info: {
      title: `${pkg.description} Documentation`,
      version: pkg.api_version,
      contact: {
        name: 'Guga Zimmermann',
        email: 'gugazimmermann@gmail.com',
      },
    },
    jsonEditor: true,
    auth: false,
  };
  await server.register([
    { plugin: authBasic },
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await server.auth.strategy('simple', 'basic', { validate });

  server.views({
    engines: {
      html: handlebars,
    },
    relativeTo: __dirname,
    path: '../views',
    layoutPath: '../views/layout',
    layout: './default',
    partialsPath: '../views/partials',
  });
  await server.route(routes);
  await server.start();
  return server;
};

module.exports = { createServer, startServer };
