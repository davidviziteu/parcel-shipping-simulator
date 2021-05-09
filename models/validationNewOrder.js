const Joi = require('joi');


const newOrderSchema = Joi.object().keys({
    fullName_sender: Joi.string().required(),
    contactPerson_sender: Joi.string().regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).required(),
    phone_sender : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email_sender : Joi.string().email().required(),
   county_sender : Joi.string().required(),
   country_sender :Joi.string().required(),
   address_sender : Joi.string().required(),

   fullName_receiver :Joi.string().required(),
   contactPerson_receiver :Joi.string().required(),
   phone_receiver : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
   county_receiver :Joi.string().required(),
   country_receiver : Joi.string().required(),
   address_receiver : Joi.string().required(),

   nrEnvelope :Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
   nrParcel :Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
   weight : Joi.string().pattern(/^[0-9]+$/).allow(null, ''),

   length :Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
   width :Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
   height :Joi.string().pattern(/^[0-9]+$/).allow(null, ''),
   date: Joi.date(),
   hour:Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow(null, ''),
   preference1: Joi.boolean(),
   preference2: Joi.boolean(),
   preference3: Joi.boolean(),
   payment : Joi.string().required(),
   mentions : Joi.string().required().allow(null, '')
});

module.exports = newOrderSchema