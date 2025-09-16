const Joi = require('joi');

const routeSchema = Joi.object({
  routeName: Joi.string().required(),
  stops: Joi.array().items(Joi.string().required()).min(1).required(),
});

module.exports = routeSchema;