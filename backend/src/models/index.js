const { Sequelize } = require('sequelize');
const env = require('../config/env');

const sslOptions = env.dbSsl
  ? {
      require: true,
      rejectUnauthorized: false,
    }
  : false;

const sequelize = env.databaseUrl
  ? new Sequelize(env.databaseUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: sslOptions ? { ssl: sslOptions } : {},
    })
  : new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
      host: env.dbHost,
      port: env.dbPort,
      dialect: 'postgres',
      logging: false,
      dialectOptions: sslOptions ? { ssl: sslOptions } : {},
    });

const db = {
  sequelize,
  Sequelize,
};

db.Admin = require('./admin.model')(sequelize);
db.Product = require('./product.model')(sequelize);

module.exports = db;
