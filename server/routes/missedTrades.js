const express = require('express');
const {
  getMissedTrades,
  getMissedTrade,
  createMissedTrade,
  updateMissedTrade,
  deleteMissedTrade,
  getMissedTradeStats
} = require('../controllers/missedTrades');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getMissedTrades)
  .post(createMissedTrade);

router.route('/stats')
  .get(getMissedTradeStats);

router.route('/:id')
  .get(getMissedTrade)
  .put(updateMissedTrade)
  .delete(deleteMissedTrade);

module.exports = router;
