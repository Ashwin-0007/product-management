const STOCK_STATUS = Object.freeze({
  IN_STOCK: 'IN_STOCK',
  LOW_STOCK: 'LOW_STOCK',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
});

const STOCK_STATUS_VALUES = Object.values(STOCK_STATUS);

module.exports = {
  STOCK_STATUS,
  STOCK_STATUS_VALUES,
};
