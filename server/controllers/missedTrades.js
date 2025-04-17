const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const MissedTrade = require('../models/MissedTrade');
const logger = require('../utils/logger');

// @desc    Get all missed trades
// @route   GET /api/v1/missed-trades
// @access  Private
exports.getMissedTrades = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };
  
  // Add user filter
  reqQuery.user = req.user.id;

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = MissedTrade.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-date');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await MissedTrade.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const missedTrades = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: missedTrades.length,
    pagination,
    data: missedTrades
  });
});

// @desc    Get single missed trade
// @route   GET /api/v1/missed-trades/:id
// @access  Private
exports.getMissedTrade = asyncHandler(async (req, res, next) => {
  const missedTrade = await MissedTrade.findById(req.params.id);

  if (!missedTrade) {
    return next(
      new ErrorResponse(`Missed trade not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns missed trade
  if (missedTrade.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this missed trade`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: missedTrade
  });
});

// @desc    Create new missed trade
// @route   POST /api/v1/missed-trades
// @access  Private
exports.createMissedTrade = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const missedTrade = await MissedTrade.create(req.body);

  res.status(201).json({
    success: true,
    data: missedTrade
  });
});

// @desc    Update missed trade
// @route   PUT /api/v1/missed-trades/:id
// @access  Private
exports.updateMissedTrade = asyncHandler(async (req, res, next) => {
  let missedTrade = await MissedTrade.findById(req.params.id);

  if (!missedTrade) {
    return next(
      new ErrorResponse(`Missed trade not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns missed trade
  if (missedTrade.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this missed trade`, 401)
    );
  }

  missedTrade = await MissedTrade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: missedTrade
  });
});

// @desc    Delete missed trade
// @route   DELETE /api/v1/missed-trades/:id
// @access  Private
exports.deleteMissedTrade = asyncHandler(async (req, res, next) => {
  const missedTrade = await MissedTrade.findById(req.params.id);

  if (!missedTrade) {
    return next(
      new ErrorResponse(`Missed trade not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns missed trade
  if (missedTrade.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this missed trade`, 401)
    );
  }

  await missedTrade.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get missed trade statistics
// @route   GET /api/v1/missed-trades/stats
// @access  Private
exports.getMissedTradeStats = asyncHandler(async (req, res, next) => {
  const missedTrades = await MissedTrade.find({ user: req.user.id });
  
  // Calculate statistics
  const totalMissedTrades = missedTrades.length;
  const totalMissedProfit = missedTrades.reduce((acc, trade) => acc + trade.estimatedProfit, 0);
  const averageMissedProfit = totalMissedTrades > 0 ? totalMissedProfit / totalMissedTrades : 0;
  
  // Group by reason
  const reasonCounts = {};
  missedTrades.forEach(trade => {
    if (reasonCounts[trade.reason]) {
      reasonCounts[trade.reason]++;
    } else {
      reasonCounts[trade.reason] = 1;
    }
  });
  
  res.status(200).json({
    success: true,
    data: {
      totalMissedTrades,
      totalMissedProfit,
      averageMissedProfit,
      reasonCounts
    }
  });
});
