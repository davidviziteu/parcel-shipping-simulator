const Joi = require('joi');

exports.modifyCarSchema = Joi.object().options({ abortEarly: false }).keys({
    registration_number: Joi.string().regex(/^[A-Z][A-Z][0-9][0-9][A-Z][A-Z][A-Z]$/).required(),
    id_driver: Joi.number().required(),
    status: Joi.string().required().valid("Reparată", "Avariată", "Adaugă", "Șterge"),
});