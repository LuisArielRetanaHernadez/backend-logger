const joi = require('joi');

const logsJoi = joi.object({
  type: joi.any().valid('error', 'warning', 'info' ),
  priority: joi.any().valid('lowest', 'low', 'medium', 'high', 'highest'),
  path:  joi.string(),
  message: joi.any(),
  request: joi.any(),
  response: joi.any(),
})

exports.logsJoi = logsJoi;