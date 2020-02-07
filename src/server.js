const Hapi = require('hapi');
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
  await server.route(routes);
  await server.start();
  return server;
};

module.exports = { createServer, startServer };
