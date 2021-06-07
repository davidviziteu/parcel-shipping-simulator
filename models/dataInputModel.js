const Joi = require("joi");


var cityList = ["Ilfov", "Cluj", "Constanța", "Dolj", "Galați", "Iași", "Oradea", "Sibiu", "Timișoara"];

driverListSchema = Joi.object().options({ abortEarly: false }).keys({
    id: Joi.number().required(),
    car: Joi.string().required(),
    county: Joi.string().required().valid(...cityList)
})

awbListSchema = Joi.object().options({ abortEarly: false }).keys({
    awb: Joi.number().required(),
    currentLocation: Joi.string().required(),
    countyDestination: Joi.string().required()
})

exports.driverGetTaskMainServerDataInputSchema = Joi.object().options({ abortEarly: false }).keys({
    county: Joi.string().required().valid(...cityList),
    driverList: Joi.array().items(driverListSchema),
    awbList: Joi.array().items(awbListSchema),
});


exports.driverGetTaskInputSchema = Joi.object().options({ abortEarly: false }).keys({
    id: Joi.number().required(),
    token: Joi.string().required(),
    county: Joi.string().required().valid(...cityList)
});

exports.driverUpdateTaskSchema = Joi.object().options({ abortEarly: false }).keys({
    id: Joi.number().required(),
    token: Joi.string().required(),
    remove: Joi.number(),
})