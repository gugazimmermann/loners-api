const Joi = require('joi');
const eventsV1Handler = require('./eventsV1Handler');

const eventSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string().required(),
  label: Joi.string().required(),
  date: Joi.date().required(),
  duration: Joi.number().required(),
  description: Joi.string().required(),
  price: Joi.number().optional(),
  featured: Joi.boolean().optional(),
});

const eventPostSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  label: Joi.string().required(),
  date: Joi.date().required(),
  duration: Joi.number().required(),
  description: Joi.string().required(),
  price: Joi.number().optional(),
  featured: Joi.boolean().optional(),
});

const eventUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  image: Joi.string().optional(),
  label: Joi.string().optional(),
  date: Joi.date().optional(),
  duration: Joi.number().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  featured: Joi.boolean().optional(),
});

const eventsV1Route = [
  {
    method: 'GET',
    path: '/api/v1/events',
    handler: eventsV1Handler.getAll,
    options: {
      description: 'Get all events',
      tags: ['api', 'events'],
      response: {
        schema: Joi.object({
          data: Joi.array()
            .items(eventSchema)
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
          data: eventSchema,
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/events',
    handler: eventsV1Handler.post,
    options: {
      description: 'Creates an event',
      tags: ['api', 'events'],
      validate: {
        payload: eventPostSchema,
      },
      response: {
        schema: Joi.object({
          data: eventSchema,
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/events/{id}',
    handler: eventsV1Handler.update,
    options: {
      description: 'Updates an event',
      tags: ['api', 'events'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the event item'),
        }),
        payload: eventUpdateSchema,
      },
      response: {
        schema: Joi.object({
          data: eventSchema,
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/events/{id}',
    handler: eventsV1Handler.remove,
    options: {
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
          data: eventSchema,
        }),
      },
    },
  },
];

module.exports = eventsV1Route;
