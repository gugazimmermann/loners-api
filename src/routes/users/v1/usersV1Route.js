const Joi = require('joi');
const usersV1Handler = require('./usersV1Handler');
const schemas = require('./schemas/users');

const usersV1Route = [
  {
    method: 'POST',
    path: '/api/v1/user',
    handler: usersV1Handler.post,
    options: {
      auth: false,
      validate: {
        payload: schemas.userPostSchema,
      },
      response: {
        schema: Joi.object({
          data: schemas.userReturnSchema,
        }),
      },
    },
  },
];

module.exports = usersV1Route;
