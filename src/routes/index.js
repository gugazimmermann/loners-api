const helloWorldRoute = require('./hello-world/helloWorldRoute');
const eventsV1Route = require('./events/v1/eventsV1Route');
const usersV1Route = require('./users/v1/usersV1Route');
const viewsRoute = require('./views/viewsRoute');

const routes = [
  helloWorldRoute,
  ...eventsV1Route,
  ...viewsRoute,
  ...usersV1Route,
];

module.exports = routes;
