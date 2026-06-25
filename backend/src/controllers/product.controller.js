const productService = require('../services/product.service');
const { successResponse } = require('../utils/apiResponse');

const listProducts = async (req, res) => {
  const { products, pagination } = await productService.listProducts({
    search: req.query.search,
    page: req.query.page,
  });

  return successResponse(res, {
    message: 'Products fetched successfully',
    data: products,
    meta: {
      count: products.length,
      ...pagination,
    },
  });
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return successResponse(res, {
    message: 'Product fetched successfully',
    data: product,
  });
};

const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: 'Product created successfully',
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  return successResponse(res, {
    message: 'Product updated successfully',
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);

  return successResponse(res, {
    message: 'Product deleted successfully',
    data: null,
  });
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
