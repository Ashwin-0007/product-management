const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateAccessToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
