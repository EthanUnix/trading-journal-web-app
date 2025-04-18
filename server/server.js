const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const config = require('./config/config');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const trades = require('./routes/trades');
const missedTrades = require('./routes/missedTrades');
const brokerAccounts = require('./routes/brokerAccounts');
const health = require('./routes/health');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: [config.clientURL, config.netlifyURL],
  credentials: true
}));

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/trades', trades);
app.use('/api/v1/missed-trades', missedTrades);
app.use('/api/v1/broker-accounts', brokerAccounts);

// Add this line for health routes
const healthRoutes = require('./routes/health');
app.use('/api/v1/health', healthRoutes);

// Serve static assets in production

if (config.env === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handler middleware
app.use(errorHandler);

const PORT = config.port;

const server = app.listen(
  PORT,
  () => {
    logger.info(`Server running in ${config.env} mode on port ${PORT}`);
  }
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = server;
