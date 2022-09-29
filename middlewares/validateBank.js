const Joi = require('joi');

const schema = Joi.object().keys({
    titular: Joi.string()
        .pattern(new RegExp('^[ A-Za-z]{3,60}$'))
        .min(3)
        .max(60)
        .required(),

    number: Joi.string()
        .pattern(new RegExp('^[0-9]{6,25}$')),
})

module.exports = schema;