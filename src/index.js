const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const handlebars = require('handlebars');
const pkg = require('../package.json');
const initDb = require('./database');
const { createServer, startServer } = require('./server');

(async () => {
  try {
    const server = await createServer();
    const swaggerOptions = {
      info: {
        title: `${pkg.description} Documentation`,
        version: pkg.api_version,
        contact: {
          name: 'Guga Zimmermann',
          email: 'gugazimmermann@gmail.com',
        },
      },
      basePath: '/api/',
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
    await initDb();
    await startServer(server);
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();
