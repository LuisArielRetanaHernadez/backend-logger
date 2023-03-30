const validator = (schema) => (payload) => {
  schema.validate(payload,  { abortEarly: false });
}

exports.validator = validator;