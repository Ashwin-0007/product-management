export const formatCurrency = value => {
  const amount = Number(value);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number.isNaN(amount) ? 0 : amount);
};
