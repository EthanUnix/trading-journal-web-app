const express = require('express');
const {
  getTrades,
  getTrade,
  createTrade,
  updateTrade,
  deleteTrade,
  getTradeStats
} = require('../controllers/trades');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getTrades)
  .post(createTrade);

router.route('/stats')
  .get(getTradeStats);

router.route('/:id')
  .get(getTrade)
  .put(updateTrade)
  .delete(deleteTrade);

module.exports = router;
