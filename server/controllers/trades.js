const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Trade = require('../models/Trade');
const logger = require('../utils/logger');

// @desc    Get all trades
// @route   GET /api/v1/trades
// @access  Private
exports.getTrades = asyncHandler(async (req, res, next) => {
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
  let query = Trade.find(JSON.parse(queryStr));

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
    query = query.sort('-openTime');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Trade.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const trades = await query;

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
    count: trades.length,
    pagination,
    data: trades
  });
});

// @desc    Get single trade
// @route   GET /api/v1/trades/:id
// @access  Private
exports.getTrade = asyncHandler(async (req, res, next) => {
  const trade = await Trade.findById(req.params.id);

  if (!trade) {
    return next(
      new ErrorResponse(`Trade not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns trade
  if (trade.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this trade`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: trade
  });
});

// @desc    Create new trade
// @route   POST /api/v1/trades
// @access  Private
exports.createTrade = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const trade = await Trade.create(req.body);

  res.status(201).json({
    success: true,
    data: trade
  });
});

// @desc    Update trade
// @route   PUT /api/v1/trades/:id
// @access  Private
exports.updateTrade = asyncHandler(async (req, res, next) => {
  let trade = await Trade.findById(req.params.id);

  if (!trade) {
    return next(
      new ErrorResponse(`Trade not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns trade
  if (trade.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this trade`, 401)
    );
  }

  trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: trade
  });
});

// @desc    Delete trade
// @route   DELETE /api/v1/trades/:id
// @access  Private
exports.deleteTrade = asyncHandler(async (req, res, next) => {
  const trade = await Trade.findById(req.params.id);

  if (!trade) {
    return next(
      new ErrorResponse(`Trade not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns trade
  if (trade.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this trade`, 401)
    );
  }

  await trade.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get trade statistics
// @route   GET /api/v1/trades/stats
// @access  Private
exports.getTradeStats = asyncHandler(async (req, res, next) => {
  const trades = await Trade.find({ user: req.user.id });
  
  // Calculate statistics
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.profit > 0).length;
  const losingTrades = trades.filter(trade => trade.profit < 0).length;
  const totalProfit = trades.reduce((acc, trade) => acc + trade.profit, 0);
  const totalWinAmount = trades
    .filter(trade => trade.profit > 0)
    .reduce((acc, trade) => acc + trade.profit, 0);
  const totalLossAmount = Math.abs(
    trades
      .filter(trade => trade.profit < 0)
      .reduce((acc, trade) => acc + trade.profit, 0)
  );
  
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const profitFactor = totalLossAmount > 0 ? totalWinAmount / totalLossAmount : totalWinAmount > 0 ? Infinity : 0;
  const averageWin = winningTrades > 0 ? totalWinAmount / winningTrades : 0;
  const averageLoss = losingTrades > 0 ? totalLossAmount / losingTrades : 0;
  
  res.status(200).json({
    success: true,
    data: {
      totalTrades,
      winningTrades,
      losingTrades,
      totalProfit,
      winRate,
      profitFactor,
      averageWin,
      averageLoss
    }
  });
});
