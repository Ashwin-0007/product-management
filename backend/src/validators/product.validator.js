const Joi = require('joi');
const { STOCK_STATUS_VALUES } = require('../constants/stockStatus');
const validateRequest = require('./validateRequest');

const productIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Product id must be a positive integer',
    'number.integer': 'Product id must be a positive integer',
    'number.positive': 'Product id must be a positive integer',
    'any.required': 'Product id is required',
  }),
});

const searchProductsSchema = Joi.object({
  search: Joi.string().trim().max(120).optional().allow('').messages({
    'string.max': 'Search term must be at most 120 characters',
  }),
  page: Joi.number().integer().positive().default(1).messages({
    'number.base': 'Page must be a positive integer',
    'number.integer': 'Page must be a positive integer',
    'number.positive': 'Page must be a positive integer',
  }),
});

const productPayloadSchema = {
  name: Joi.string().trim().min(2).max(120).required().messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name must be between 2 and 120 characters',
    'string.max': 'Product name must be between 2 and 120 characters',
    'any.required': 'Product name is required',
  }),
  category: Joi.string().trim().min(2).max(80).required().messages({
    'string.empty': 'Category is required',
    'string.min': 'Category must be between 2 and 80 characters',
    'string.max': 'Category must be between 2 and 80 characters',
    'any.required': 'Category is required',
  }),
  price: Joi.number().min(0).precision(2).required().messages({
    'number.base': 'Price must be a number greater than or equal to 0',
    'number.min': 'Price must be a number greater than or equal to 0',
    'any.required': 'Price is required',
  }),
  stockStatus: Joi.string()
    .valid(...STOCK_STATUS_VALUES)
    .required()
    .messages({
      'any.only': `Stock status must be one of: ${STOCK_STATUS_VALUES.join(', ')}`,
      'string.empty': 'Stock status is required',
      'any.required': 'Stock status is required',
    }),
};

const createProductSchema = Joi.object(productPayloadSchema);

const updateProductSchema = Joi.object({
  name: productPayloadSchema.name.optional(),
  category: productPayloadSchema.category.optional(),
  price: productPayloadSchema.price.optional(),
  stockStatus: productPayloadSchema.stockStatus.optional(),
})
  .min(1)
  .messages({
    'object.min': 'At least one product field is required for update',
  });

const productIdValidator = validateRequest({
  params: productIdSchema,
});

const searchProductsValidator = validateRequest({
  query: searchProductsSchema,
});

const createProductValidator = validateRequest({
  body: createProductSchema,
});

const updateProductValidator = validateRequest({
  body: updateProductSchema,
});

module.exports = {
  productIdValidator,
  searchProductsValidator,
  createProductValidator,
  updateProductValidator,
};
