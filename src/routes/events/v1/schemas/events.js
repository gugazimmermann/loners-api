const Joi = require('joi');

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


module.exports = {
  eventSchema,
  eventPostSchema,
  eventUpdateSchema,
};
