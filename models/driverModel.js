const Joi = require("joi");
const models = require(`../models`)

exports.driverGetTaskInputSchema = Joi.object().options({ abortEarly: false }).keys({
    id: Joi.string().required(),
    county: Joi.string().required().valid(...models.orderModel.cityList)
});