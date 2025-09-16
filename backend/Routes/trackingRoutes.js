const express = require('express');
const router = express.Router();
const { updateLocation, getLocationByBus } = require('../controllers/trackingController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin or bus drivers update location
router.post('/update', protect, admin, updateLocation);

// Get current location of a bus (any authenticated user)
router.get('/:busId', protect, getLocationByBus);

module.exports = router;