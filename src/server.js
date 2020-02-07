const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const handlebars = require('handlebars');
const pkg = require('../package.json');
const routes = require('./routes');
require('dotenv').config();

const createServer = async () => {
  const server = await new Hapi.Server({
    port: process.env.SERVER_PORT || 3000,
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
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.views({
    engines: {
      html: handlebars,
    },
    relativeTo: __dirname,
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials',
    helpersPath: 'views/helpers',
  });
  await server.route(routes);
  await server.start();
  return server;
};

module.exports = { createServer, startServer };
