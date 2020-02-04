const eventsHandler = require('./eventsHandler');

const eventsRoute = [
  {
    method: 'GET',
    path: '/events',
    handler: eventsHandler.getAll,
    options: {
      description: 'Get all events',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/events/{eventId}',
    handler: eventsHandler.getOne,
    options: {
      description: 'Get an event',
      tags: ['api'],
    },
  },
  {
    method: 'POST',
    path: '/events',
    handler: eventsHandler.post,
    options: {
      description: 'Creates an event',
      tags: ['api'],
    },
  },
  {
    method: 'PUT',
    path: '/events/{eventId}',
    handler: eventsHandler.update,
    options: {
      description: 'Updates an event',
      tags: ['api'],
    },
  },
  {
    method: 'DELETE',
    path: '/events/{eventId}',
    handler: eventsHandler.remove,
    options: {
      description: 'Delete an event',
      tags: ['api'],
    },
  },
];

module.exports = eventsRoute;
