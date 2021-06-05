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



exports.dataInputSchema = Joi.object().options({ abortEarly: false }).keys({
    county: Joi.string().required(),
    driverList: Joi.array().required().items(driverListSchema),
    awbList: Joi.array().required().items(awbListSchema)
});