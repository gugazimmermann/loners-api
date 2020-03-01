const Joi = require('joi');
const eventsV1Handler = require('./eventsV1Handler');
const schemas = require('./schemas/events');

const eventsV1Route = [
  {
    method: 'GET',
    path: '/api/v1/events',
    handler: eventsV1Handler.getAll,
    options: {
      auth: 'simple',
      description: 'Get all events',
      tags: ['api', 'events'],
      response: {
        schema: Joi.object({
          data: Joi.array()
            .items(schemas.eventSchema)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/events/{id}',
    handler: eventsV1Handler.getOne,
    options: {
      auth: 'simple',
      description: 'Get an event',
      tags: ['api', 'events'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the event item'),
        }),
      },
      response: {
        schema: Joi.object({
          data: schemas.eventSchema,
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/events',
    handler: eventsV1Handler.post,
    options: {
      auth: 'simple',
      description: 'Creates an event',
      tags: ['api', 'events'],
      validate: {
        payload: schemas.eventPostSchema,
      },
      response: {
        schema: Joi.object({
          data: schemas.eventSchema,
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/events/{id}',
    handler: eventsV1Handler.update,
    options: {
      auth: 'simple',
      description: 'Updates an event',
      tags: ['api', 'events'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the event item'),
        }),
        payload: schemas.eventUpdateSchema,
      },
      response: {
        schema: Joi.object({
          data: schemas.eventSchema,
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/events/{id}',
    handler: eventsV1Handler.remove,
    options: {
      auth: 'simple',
      description: 'Delete an event',
      tags: ['api', 'events'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the event item'),
        }),
      },
      response: {
        schema: Joi.object({
          data: schemas.eventSchema,
        }),
      },
    },
  },
];

module.exports = eventsV1Route;
