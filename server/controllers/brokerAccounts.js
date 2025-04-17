const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const BrokerAccount = require('../models/BrokerAccount');
const SyncHistory = require('../models/SyncHistory');
const logger = require('../utils/logger');

// @desc    Get all broker accounts
// @route   GET /api/v1/broker-accounts
// @access  Private
exports.getBrokerAccounts = asyncHandler(async (req, res, next) => {
  const brokerAccounts = await BrokerAccount.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: brokerAccounts.length,
    data: brokerAccounts
  });
});

// @desc    Get single broker account
// @route   GET /api/v1/broker-accounts/:id
// @access  Private
exports.getBrokerAccount = asyncHandler(async (req, res, next) => {
  const brokerAccount = await BrokerAccount.findById(req.params.id);

  if (!brokerAccount) {
    return next(
      new ErrorResponse(`Broker account not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns broker account
  if (brokerAccount.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this broker account`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: brokerAccount
  });
});

// @desc    Create new broker account
// @route   POST /api/v1/broker-accounts
// @access  Private
exports.createBrokerAccount = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const brokerAccount = await BrokerAccount.create(req.body);

  res.status(201).json({
    success: true,
    data: brokerAccount
  });
});

// @desc    Update broker account
// @route   PUT /api/v1/broker-accounts/:id
// @access  Private
exports.updateBrokerAccount = asyncHandler(async (req, res, next) => {
  let brokerAccount = await BrokerAccount.findById(req.params.id);

  if (!brokerAccount) {
    return next(
      new ErrorResponse(`Broker account not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns broker account
  if (brokerAccount.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this broker account`, 401)
    );
  }

  brokerAccount = await BrokerAccount.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: brokerAccount
  });
});

// @desc    Delete broker account
// @route   DELETE /api/v1/broker-accounts/:id
// @access  Private
exports.deleteBrokerAccount = asyncHandler(async (req, res, next) => {
  const brokerAccount = await BrokerAccount.findById(req.params.id);

  if (!brokerAccount) {
    return next(
      new ErrorResponse(`Broker account not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns broker account
  if (brokerAccount.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this broker account`, 401)
    );
  }

  await brokerAccount.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Sync broker account
// @route   POST /api/v1/broker-accounts/:id/sync
// @access  Private
exports.syncBrokerAccount = asyncHandler(async (req, res, next) => {
  const brokerAccount = await BrokerAccount.findById(req.params.id);

  if (!brokerAccount) {
    return next(
      new ErrorResponse(`Broker account not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns broker account
  if (brokerAccount.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to sync this broker account`, 401)
    );
  }

  // Create sync history record
  const syncHistory = await SyncHistory.create({
    user: req.user.id,
    brokerAccount: brokerAccount._id,
    accountNumber: brokerAccount.accountNumber,
    status: 'in_progress',
    message: 'Synchronization started'
  });

  // In a real application, this would trigger an async process to sync with MT4/MT5
  // For now, we'll simulate a successful sync
  setTimeout(async () => {
    try {
      // Update broker account status and last sync time
      brokerAccount.status = 'connected';
      brokerAccount.lastSync = Date.now();
      await brokerAccount.save();

      // Update sync history
      syncHistory.status = 'success';
      syncHistory.tradesImported = Math.floor(Math.random() * 10) + 1; // Random number of trades
      syncHistory.message = `Successfully synchronized ${syncHistory.tradesImported} trades`;
      await syncHistory.save();

      logger.info(`Sync completed for broker account ${brokerAccount.accountNumber}`);
    } catch (err) {
      logger.error(`Sync failed for broker account ${brokerAccount.accountNumber}: ${err.message}`);
      
      // Update sync history with error
      syncHistory.status = 'error';
      syncHistory.message = `Synchronization failed: ${err.message}`;
      await syncHistory.save();
    }
  }, 5000); // Simulate 5 second processing time

  res.status(200).json({
    success: true,
    data: {
      message: 'Synchronization started',
      syncHistoryId: syncHistory._id
    }
  });
});

// @desc    Get sync history for a broker account
// @route   GET /api/v1/broker-accounts/:id/sync-history
// @access  Private
exports.getSyncHistory = asyncHandler(async (req, res, next) => {
  const brokerAccount = await BrokerAccount.findById(req.params.id);

  if (!brokerAccount) {
    return next(
      new ErrorResponse(`Broker account not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns broker account
  if (brokerAccount.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this broker account`, 401)
    );
  }

  const syncHistory = await SyncHistory.find({ 
    brokerAccount: brokerAccount._id 
  }).sort('-timestamp');

  res.status(200).json({
    success: true,
    count: syncHistory.length,
    data: syncHistory
  });
});
