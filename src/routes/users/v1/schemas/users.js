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
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.boolean().required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().required().optional(),
  user: Joi.string().required().optional(),
  password: Joi.string().required().optional(),
  role: Joi.string().required().optional(),
  active: Joi.boolean().required().optional(),
  featured: Joi.boolean().optional(),
});


module.exports = {
  userSchema,
  userPostSchema,
  userUpdateSchema,
};
