const Joi = require('joi');
const usersV1Handler = require('./usersV1Handler');
const schemas = require('./schemas/users');

const usersV1Route = [
  {
    method: 'GET',
    path: '/api/v1/users',
    handler: usersV1Handler.getAll,
    options: {
      auth: 'simple',
      description: 'Get all users',
      tags: ['api', 'users'],
      response: {
        schema: Joi.object({
          data: Joi.array()
            .items(schemas.userSchema)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    handler: usersV1Handler.getOne,
    options: {
      auth: 'simple',
      description: 'Get an user',
      tags: ['api', 'users'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the user item'),
        }),
      },
      response: {
        schema: Joi.object({
          data: schemas.userSchema,
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    handler: usersV1Handler.post,
    options: {
      auth: 'simple',
      description: 'Creates an user',
      tags: ['api', 'users'],
      validate: {
        payload: schemas.userPostSchema,
      },
      response: {
        schema: Joi.object({
          data: schemas.userSchema,
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/users/{id}',
    handler: usersV1Handler.update,
    options: {
      auth: 'simple',
      description: 'Updates an user',
      tags: ['api', 'users'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the user item'),
        }),
        payload: schemas.userUpdateSchema,
      },
      response: {
        schema: Joi.object({
          data: schemas.userSchema,
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/{id}',
    handler: usersV1Handler.remove,
    options: {
      auth: 'simple',
      description: 'Delete an user',
      tags: ['api', 'users'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('The id for the user item'),
        }),
      },
      response: {
        schema: Joi.object({
          data: schemas.userSchema,
        }),
      },
    },
  },
];

module.exports = usersV1Route;
