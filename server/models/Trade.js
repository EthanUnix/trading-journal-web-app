const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: [true, 'Please provide a symbol'],
    trim: true
  },
  direction: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: [true, 'Please specify trade direction']
  },
  openTime: {
    type: Date,
    required: [true, 'Please provide open time']
  },
  closeTime: {
    type: Date,
    required: [true, 'Please provide close time']
  },
  openPrice: {
    type: Number,
    required: [true, 'Please provide open price']
  },
  closePrice: {
    type: Number,
    required: [true, 'Please provide close price']
  },
  lotSize: {
    type: Number,
    required: [true, 'Please provide lot size']
  },
  profit: {
    type: Number,
    required: [true, 'Please provide profit/loss']
  },
  pips: {
    type: Number,
    required: [true, 'Please provide pips']
  },
  commission: {
    type: Number,
    default: 0
  },
  strategy: {
    type: String,
    trim: true
  },
  sessionType: {
    type: String,
    enum: ['ASIAN', 'LONDON', 'NEW_YORK', 'OVERLAP', 'OTHER'],
    default: 'OTHER'
  },
  rMultiple: {
    type: Number
  },
  notes: {
    type: String
  },
  images: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  source: {
    type: String,
    enum: ['MANUAL', 'MT4', 'MT5'],
    default: 'MANUAL'
  },
  brokerAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BrokerAccount'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate profit, pips, and R-multiple before saving if not provided
TradeSchema.pre('save', function(next) {
  // Update timestamp
  this.updatedAt = Date.now();
  
  // Calculate pips if not provided
  if (!this.pips) {
    // Different pip calculation based on currency pair
    const pipMultiplier = this.symbol.includes('JPY') ? 100 : 10000;
    
    if (this.direction === 'BUY') {
      this.pips = Math.round((this.closePrice - this.openPrice) * pipMultiplier);
    } else {
      this.pips = Math.round((this.openPrice - this.closePrice) * pipMultiplier);
    }
  }
  
  next();
});

// Virtual for net profit (profit - commission)
TradeSchema.virtual('netProfit').get(function() {
  return this.profit - this.commission;
});

// Virtual for result (WIN/LOSS)
TradeSchema.virtual('result').get(function() {
  return this.profit >= 0 ? 'WIN' : 'LOSS';
});

// Virtual for holding time
TradeSchema.virtual('holdingTime').get(function() {
  const diff = this.closeTime - this.openTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
});

// Set virtuals to true when converting to JSON
TradeSchema.set('toJSON', { virtuals: true });
TradeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Trade', TradeSchema);
