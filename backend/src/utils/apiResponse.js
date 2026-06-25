const successResponse = (
  res,
  { statusCode = 200, message = 'Success', data = null, meta = null }
) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });

const errorResponse = (
  res,
  {
    statusCode = 500,
    message = 'Internal server error',
    errors = null,
    stack,
  }
) =>
  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(stack ? { stack } : {}),
  });

module.exports = {
  successResponse,
  errorResponse,
};
