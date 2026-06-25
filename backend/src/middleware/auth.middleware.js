const jwt = require('jsonwebtoken');
const env = require('../config/env');
const authService = require('../services/auth.service');
const ApiError = require('../utils/errors/ApiError');

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication token is required');
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret);

    if (payload.type !== authService.TOKEN_TYPES.ACCESS) {
      throw new ApiError(401, 'Access token is required');
    }

    const admin = await authService.getAdminById(payload.sub);

    req.admin = admin;
    return next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    return next(new ApiError(401, 'Invalid or expired authentication token'));
  }
};

module.exports = {
  authenticateAdmin,
};
