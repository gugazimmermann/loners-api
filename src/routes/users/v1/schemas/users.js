const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.boolean().required(),
});

const userPostSchema = Joi.object({
  user: Joi.string().optional(),
  password: Joi.string().optional(),
});

const userReturnSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  user: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.boolean().required(),
});

module.exports = {
  userSchema,
  userPostSchema,
  userReturnSchema,
};
