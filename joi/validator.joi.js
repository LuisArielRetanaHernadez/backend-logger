// utils
const AppError = require('../utils/AppError');

exports.validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new AppError(error.message, 400));
    }

    return next();
  };
}