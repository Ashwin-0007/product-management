const express = require('express');
const { successResponse } = require('../utils/apiResponse');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  return successResponse(res, {
    message: 'Product Management Dashboard API is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;
