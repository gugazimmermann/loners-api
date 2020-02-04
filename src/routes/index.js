const helloWorldRoute = require('./hello-world/helloWorldRoute');
const eventsRoute = require('./events/eventsRoute');

const routes = [
  helloWorldRoute,
  ...eventsRoute,
];

module.exports = routes;
