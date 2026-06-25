const authService = require('../services/auth.service');
const { successResponse } = require('../utils/apiResponse');

const login = async (req, res) => {
  const data = await authService.login(req.body);

  return successResponse(res, {
    message: 'Login successful',
    data,
  });
};

const getMe = async (req, res) => {
  return successResponse(res, {
    message: 'Admin profile fetched successfully',
    data: {
      admin: req.admin.toSafeJSON(),
    },
  });
};

const refreshToken = async (req, res) => {
  const data = await authService.refreshAccessToken(req.body.refreshToken);

  return successResponse(res, {
    message: 'Access token refreshed successfully',
    data,
  });
};

const logout = async (req, res) => {
  await authService.logout(req.admin);

  return successResponse(res, {
    message: 'Logged out successfully',
    data: null,
  });
};

module.exports = {
  login,
  getMe,
  refreshToken,
  logout,
};
