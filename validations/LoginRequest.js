const Joi = require('joi');

const loginSchema = Joi.object({

   
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email()
        .required(),

})
    

module.exports = {
    loginSchema
}