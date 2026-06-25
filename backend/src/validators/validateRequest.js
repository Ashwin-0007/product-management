const ApiError = require('../utils/errors/ApiError');

const formatJoiErrors = details =>
  details.map(error => ({
    field: error.path.join('.'),
    message: error.message,
  }));

const validateRequest = schemaMap => (req, res, next) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  };

  const errors = [];

  Object.entries(schemaMap).forEach(([location, schema]) => {
    const { error, value } = schema.validate(req[location], validationOptions);

    if (error) {
      errors.push(...formatJoiErrors(error.details));
      return;
    }

    req[location] = value;
  });

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  return next();
};

module.exports = validateRequest;
