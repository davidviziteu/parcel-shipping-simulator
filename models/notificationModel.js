const Joi = require('joi');

exports.newNotificationSchema = Joi.object().options({ abortEarly: false }).keys({
    text: Joi.string().required(),
    expiry_date: Joi.date().allow(null, '')
});
exports.deleteNotificationSchema = Joi.object().options({ abortEarly: false }).keys({
    id: Joi.number().required(),
});

exports.notificationSchema = Joi.object().options({ abortEarly: false }).keys({
    id: Joi.number().required(),
    text: Joi.string().required(),
    expiry_date: Joi.date().allow(null, '')
});