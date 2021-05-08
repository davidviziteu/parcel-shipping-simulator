const Joi = require('joi');

const newOrderSchema = Joi.obiect().keys({
    fullName_sender : Joi.string().required,
   ContactPerson_sender : Joi.string().required,
   phone_sender : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
   email_sender : Joi.string().email().required(),
   county_sender : Joi.string().email().required(),
   country_sender :Joi.string().email().required(),
   address_sender : Joi.string().email().required(),

   fullName_receiver :Joi.string().required,
   ContactPerson_receiver :Joi.string().required,
   phone_receiver : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
   county_receiver :Joi.string().required,
   country_receiver : Joi.string().required,
   address_receiver : Joi.string().required,

   nrEnvelope : Joi.string().length(4).pattern(/^[0-9]+$/).required(),
   nrParcel :Joi.string().length(4).pattern(/^[0-9]+$/).required(),
   weight : Joi.string().length(4).pattern(/^[0-9]+$/).required(),

   length :Joi.string().length(5).pattern(/^[0-9]+$/).required(),
   width :Joi.string().length(5).pattern(/^[0-9]+$/).required(),
   height :Joi.string().length(5).pattern(/^[0-9]+$/).required(),

});
module.exports = {newOrderSchema}
