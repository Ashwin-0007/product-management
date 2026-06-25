const dotenv = require('dotenv');

dotenv.config({ override: process.env.NODE_ENV !== 'production' });

const requiredEnvVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];

requiredEnvVars.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL?.trim() || '',
  dbSsl:
    process.env.DB_SSL === 'true' ||
    (Boolean(process.env.DATABASE_URL) && process.env.DB_SSL !== 'false'),
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME || 'product_management_dashboard',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || '',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  adminName: process.env.ADMIN_NAME || 'Admin User',
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
