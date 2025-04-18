// server/routes/health.js
const express = require('express');
const router = express.Router();

// Health check endpoint for Render
router.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is healthy' });
});

module.exports = router;
