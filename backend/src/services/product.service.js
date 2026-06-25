const { Op } = require('sequelize');
const { Product } = require('../models');
const ApiError = require('../utils/errors/ApiError');

const PRODUCT_UPDATE_FIELDS = ['name', 'category', 'price', 'stockStatus'];
const PRODUCT_PAGE_SIZE = 10;

const listProducts = async ({ search, page = 1 }) => {
  const where = {};
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * PRODUCT_PAGE_SIZE;

  if (search) {
    where.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  const { rows, count } = await Product.findAndCountAll({
    where,
    order: [['createdAt', 'DESC']],
    limit: PRODUCT_PAGE_SIZE,
    offset,
  });

  return {
    products: rows,
    pagination: {
      page: currentPage,
      limit: PRODUCT_PAGE_SIZE,
      total: count,
      totalPages: Math.max(Math.ceil(count / PRODUCT_PAGE_SIZE), 1),
    },
  };
};

const getProductById = async productId => {
  const product = await Product.findByPk(productId);

  if (!product) throw new ApiError(404, 'Product not found');

  return product;
};

const createProduct = async payload => {
  return Product.create(payload);
};

const updateProduct = async (productId, payload) => {
  const product = await getProductById(productId);
  const updatePayload = {};

  PRODUCT_UPDATE_FIELDS.forEach(field => {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      updatePayload[field] = payload[field];
    }
  });

  await product.update(updatePayload);

  return product;
};

const deleteProduct = async productId => {
  const product = await getProductById(productId);
  await product.destroy();
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
