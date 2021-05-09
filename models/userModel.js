const Joi = require('joi');

exports.newUserSchema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    citySelect: Joi.string().required(),
    placeSelect: Joi.string().required(),
    adress: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    type: Joi.string().required()
});

exports.loginUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})