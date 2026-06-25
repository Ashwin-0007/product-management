export const STOCK_STATUS = {
  IN_STOCK: 'IN_STOCK',
  LOW_STOCK: 'LOW_STOCK',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
};

export const STOCK_STATUS_LABELS = {
  [STOCK_STATUS.IN_STOCK]: 'In stock',
  [STOCK_STATUS.LOW_STOCK]: 'Low stock',
  [STOCK_STATUS.OUT_OF_STOCK]: 'Out of stock',
};

export const STOCK_STATUS_OPTIONS = Object.values(STOCK_STATUS).map(value => ({
  value,
  label: STOCK_STATUS_LABELS[value],
}));
