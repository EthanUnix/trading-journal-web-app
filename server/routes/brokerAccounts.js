const express = require('express');
const {
  getBrokerAccounts,
  getBrokerAccount,
  createBrokerAccount,
  updateBrokerAccount,
  deleteBrokerAccount,
  syncBrokerAccount,
  getSyncHistory
} = require('../controllers/brokerAccounts');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getBrokerAccounts)
  .post(createBrokerAccount);

router.route('/:id')
  .get(getBrokerAccount)
  .put(updateBrokerAccount)
  .delete(deleteBrokerAccount);

router.route('/:id/sync')
  .post(syncBrokerAccount);

router.route('/:id/sync-history')
  .get(getSyncHistory);

module.exports = router;
