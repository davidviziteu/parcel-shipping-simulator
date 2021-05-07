const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    citySelect: Joi.string().required(),
    placeSelect: Joi.string().required(),
    adress: Joi.string().required(),
    email: Joi.string().email().required(),
    pwd: Joi.string().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});

module.exports = { newUserSchema }