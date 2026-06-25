const { sequelize } = require('../models');

const connectDB = async () => {
  await sequelize.authenticate();
  console.log('PostgreSQL connected with Sequelize');
};

module.exports = connectDB;
