const mongoose = require('mongoose');

const BrokerAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountNumber: {
    type: String,
    required: [true, 'Please provide account number'],
    trim: true
  },
  brokerName: {
    type: String,
    required: [true, 'Please provide broker name'],
    trim: true
  },
  serverName: {
    type: String,
    required: [true, 'Please provide server name'],
    trim: true
  },
  platform: {
    type: String,
    enum: ['MT4', 'MT5'],
    required: [true, 'Please specify platform type']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    select: false
  },
  status: {
    type: String,
    enum: ['connected', 'disconnected', 'error'],
    default: 'disconnected'
  },
  lastSync: {
    type: Date
  },
  autoSync: {
    type: Boolean,
    default: true
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

// Update timestamp before saving
BrokerAccountSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BrokerAccount', BrokerAccountSchema);
