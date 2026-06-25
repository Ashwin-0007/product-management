const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const env = require('../config/env');
const ApiError = require('../utils/errors/ApiError');

const TOKEN_TYPES = Object.freeze({
  ACCESS: 'access',
  REFRESH: 'refresh',
});

const signAccessToken = admin => {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      type: TOKEN_TYPES.ACCESS,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  );
};

const signRefreshToken = admin => {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      type: TOKEN_TYPES.REFRESH,
      tokenVersion: admin.refreshTokenVersion,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn,
    },
  );
};

const buildAuthPayload = admin => ({
  admin: admin.toSafeJSON(),
  accessToken: signAccessToken(admin),
  refreshToken: signRefreshToken(admin),
});

const login = async ({ email, password }) => {
  const admin = await Admin.findOne({ where: { email } });

  if (!admin) throw new ApiError(401, 'Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isPasswordValid) throw new ApiError(401, 'Invalid email or password');

  return buildAuthPayload(admin);
};

const getAdminById = async adminId => {
  const admin = await Admin.findByPk(adminId);

  if (!admin) throw new ApiError(401, 'Authenticated admin no longer exists');

  return admin;
};

const refreshAccessToken = async refreshToken => {
  let payload;

  try {
    payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  if (payload.type !== TOKEN_TYPES.REFRESH) throw new ApiError(401, 'Invalid refresh token');


  const admin = await getAdminById(payload.sub);

  if (admin.refreshTokenVersion !== payload.tokenVersion) throw new ApiError(401, 'Refresh token has been revoked');

  return {
    admin: admin.toSafeJSON(),
    accessToken: signAccessToken(admin),
  };
};

const logout = async admin => {
  await admin.increment('refreshTokenVersion');
};

module.exports = {
  TOKEN_TYPES,
  login,
  getAdminById,
  refreshAccessToken,
  logout,
};
