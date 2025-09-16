const express = require('express');
const router = express.Router();
const {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  deleteBus,
} = require('../controllers/busController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBuses)
  .post(protect, admin, createBus);

router.route('/:id')
  .get(protect, getBusById)
  .put(protect, admin, updateBus)
  .delete(protect, admin, deleteBus);

module.exports = router;