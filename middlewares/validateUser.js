const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string()
        .pattern(new RegExp('^[ A-Za-z]{3,60}$'))
        .min(3)
        .max(60)
        .required(),

    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{6,12}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

module.exports = schema;