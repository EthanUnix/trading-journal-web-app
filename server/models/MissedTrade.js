const mongoose = require('mongoose');

const MissedTradeSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Please provide date']
  },
  potentialEntryPrice: {
    type: Number,
    required: [true, 'Please provide potential entry price']
  },
  potentialExitPrice: {
    type: Number,
    required: [true, 'Please provide potential exit price']
  },
  estimatedProfit: {
    type: Number,
    required: [true, 'Please provide estimated profit']
  },
  reason: {
    type: String,
    enum: ['Hesitation', 'Lack of Confidence', 'Away From Computer', 'Missed Signal', 'Risk Management', 'Technical Issues', 'Other'],
    required: [true, 'Please provide reason for missing the trade']
  },
  notes: {
    type: String
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

// Calculate estimated profit before saving if not provided
MissedTradeSchema.pre('save', function(next) {
  // Update timestamp
  this.updatedAt = Date.now();
  
  // Calculate estimated profit if not provided
  if (!this.estimatedProfit) {
    const pipMultiplier = this.symbol.includes('JPY') ? 100 : 10000;
    
    if (this.direction === 'BUY') {
      this.estimatedProfit = Math.round((this.potentialExitPrice - this.potentialEntryPrice) * pipMultiplier);
    } else {
      this.estimatedProfit = Math.round((this.potentialEntryPrice - this.potentialExitPrice) * pipMultiplier);
    }
  }
  
  next();
});

module.exports = mongoose.model('MissedTrade', MissedTradeSchema);
