const Joi = require('joi');

const locationSchema = Joi.object({
  bus: Joi.string().length(24).hex().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

module.exports = locationSchema;