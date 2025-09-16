const Joi = require('joi');

const busSchema = Joi.object({
  busNumber: Joi.string().required(),
  capacity: Joi.number().integer().min(1).required(),
  route: Joi.string().length(24).hex().required(),
});

module.exports = busSchema;