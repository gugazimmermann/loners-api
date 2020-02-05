const Joi = require('joi');
const eventsHandler = require('./eventsHandler');

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

const eventsRoute = [
  {
    method: 'GET',
    path: '/events',
    handler: eventsHandler.getAll,
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
    path: '/events/{id}',
    handler: eventsHandler.getOne,
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
    path: '/events',
    handler: eventsHandler.post,
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
    path: '/events/{id}',
    handler: eventsHandler.update,
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
    path: '/events/{id}',
    handler: eventsHandler.remove,
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

module.exports = eventsRoute;
