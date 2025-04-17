const mongoose = require('mongoose');

const SyncHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  brokerAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BrokerAccount',
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'error', 'in_progress'],
    default: 'in_progress'
  },
  tradesImported: {
    type: Number,
    default: 0
  },
  message: {
    type: String
  }
});

module.exports = mongoose.model('SyncHistory', SyncHistorySchema);
