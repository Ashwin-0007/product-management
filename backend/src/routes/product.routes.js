const express = require('express');
const productController = require('../controllers/product.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');
const {
  productIdValidator,
  searchProductsValidator,
  createProductValidator,
  updateProductValidator,
} = require('../validators/product.validator');
const asyncHandler = require('../utils/errors/asyncHandler');

const router = express.Router();

router.use(asyncHandler(authenticateAdmin));

router
  .route('/')
  .get(searchProductsValidator, asyncHandler(productController.listProducts))
  .post(createProductValidator, asyncHandler(productController.createProduct));

router
  .route('/:id')
  .get(productIdValidator, asyncHandler(productController.getProduct))
  .patch(
    productIdValidator,
    updateProductValidator,
    asyncHandler(productController.updateProduct)
  )
  .delete(productIdValidator, asyncHandler(productController.deleteProduct));

module.exports = router;
