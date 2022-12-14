const Joi = require('joi');

const registerSchema = Joi.object({

    username: Joi.string()
        .min(3)
        .max(30)
        .required(),

    name: Joi.string()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email()
        .required(),

    roles: Joi.string()
        .required()
})
    

module.exports = {
    registerSchema
}