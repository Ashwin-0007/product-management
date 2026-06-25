const { errorResponse } = require('../utils/apiResponse');
const env = require('../config/env');

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  return errorResponse(res, {
    statusCode,
    message: err.message || 'Internal server error',
    errors: err.errors || null,
    stack: env.nodeEnv === 'production' ? undefined : err.stack,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
