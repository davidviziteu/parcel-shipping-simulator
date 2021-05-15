const Joi = require('joi');

exports.newUserSchema = Joi.object().options({ abortEarly: false }).keys({
    surname: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    type: Joi.string().required()
});

exports.loginUserSchema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean()
})

exports.driverEventsSchema = Joi.object().options({ abortEarly: false }).keys({
    accident: Joi.boolean(),
    meteo: Joi.boolean(),
    failure: Joi.boolean(),
    client: Joi.boolean(),
    content: Joi.boolean(),
    delivered: Joi.boolean(),
})