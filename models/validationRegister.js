const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    surname: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    type: Joi.string().required()
});

module.exports = newUserSchema