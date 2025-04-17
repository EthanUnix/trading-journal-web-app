const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/trading_journal',
  jwtSecret: process.env.JWT_SECRET || 'trading_journal_secret_key_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '24h',
  logLevel: process.env.LOG_LEVEL || 'info',
  clientURL: process.env.CLIENT_URL || 'http://localhost:3000'
};
