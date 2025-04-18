// Health Check Endpoint for Render

const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check endpoint for Render
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
