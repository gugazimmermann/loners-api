const helloWorldRoute = require('./hello-world/helloWorldRoute');
const eventsRoute = require('./events/eventsRoute');
const viewsRoute = require('./views/viewsRoute');

const routes = [
  helloWorldRoute,
  ...eventsRoute,
  ...viewsRoute,
];

module.exports = routes;
