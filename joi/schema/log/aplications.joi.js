const joi = require('joi');

exports.aplicationsJoi = joi.object({
  name:  joi.string().required(),
})