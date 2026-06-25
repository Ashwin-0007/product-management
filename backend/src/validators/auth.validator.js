const Joi = require('joi');
const validateRequest = require('./validateRequest');

const loginSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

const loginValidator = validateRequest({
  body: loginSchema,
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.empty': 'Refresh token is required',
    'any.required': 'Refresh token is required',
  }),
});

const refreshTokenValidator = validateRequest({
  body: refreshTokenSchema,
});

module.exports = {
  loginValidator,
  refreshTokenValidator,
};
