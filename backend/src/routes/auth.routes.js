const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');
const {
  loginValidator,
  refreshTokenValidator,
} = require('../validators/auth.validator');
const asyncHandler = require('../utils/errors/asyncHandler');

const router = express.Router();

router.post('/login', loginValidator, asyncHandler(authController.login));
router.post(
  '/refresh-token',
  refreshTokenValidator,
  asyncHandler(authController.refreshToken)
);
router.post(
  '/logout',
  asyncHandler(authenticateAdmin),
  asyncHandler(authController.logout)
);
router.get('/me', asyncHandler(authenticateAdmin), authController.getMe);

module.exports = router;
