const Joi = require('joi');

exports.estimateCostSchema = Joi.object().options({ abortEarly: false }).keys({
    source: Joi.string().valid('Ilfov', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Oradea', 'Sibiu', 'Timișoara').required(),
    destination: Joi.string().valid('Ilfov', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Oradea', 'Sibiu', 'Timișoara').required(),
});