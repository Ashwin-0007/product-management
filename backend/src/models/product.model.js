const { DataTypes } = require('sequelize');
const { STOCK_STATUS_VALUES } = require('../constants/stockStatus');

const defineProductModel = sequelize => {
  return sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stockStatus: {
        type: DataTypes.ENUM(...STOCK_STATUS_VALUES),
        allowNull: false,
        field: 'stock_status',
      },
    },
    {
      tableName: 'products',
      underscored: true,
    }
  );
};

module.exports = defineProductModel;
