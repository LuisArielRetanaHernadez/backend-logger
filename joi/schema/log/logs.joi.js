const joi = require('joi');

const logsJoi = joi.object({
  type: joi.any().valid('error', 'warning', 'info' ).required(),
  priority: joi.any().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
  path:  joi.string().required(),
  message: joi.any().required(),
  request: joi.any().required(),
  response: joi.any().required(),
})

exports.logsJoi = logsJoi;