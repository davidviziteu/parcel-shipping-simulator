import Joi from "joi";
import { JoiPasswordComplexity } from "joi-password";

const schema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    judet: Joi.string().required(),
    oras: Joi.string().required(),
    adress: Joi.string().required(),
    email: Joi.string().email().required(),
    parola: JoiPasswordComplexity.string().minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).required(),
    telefon: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});

let data = {}

const { error, value } = Joi.validate(data, schema);

if (error) {
    console.log(error.details);
}
else {
    console.log(value)
}