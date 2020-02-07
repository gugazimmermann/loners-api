const helloWorldHandler = require('./helloWorldHandler');

const helloWorldRoute = {
  method: 'GET',
  path: '/helloWorld',
  handler: helloWorldHandler,
  options: {
    description: 'Test Endpoint',
    notes: 'Returns a Hello World to test the routes',
    tags: ['api'],
    auth: 'simple',
  },
};

module.exports = helloWorldRoute;
