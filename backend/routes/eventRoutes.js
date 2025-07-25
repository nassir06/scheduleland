const express = require('express');
const router = express.Router();
const { createEvent, getUserEvents, deleteEvent, updateEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/events - create new event (must be logged in)
router.post('/', protect, createEvent);
router.get('/', protect, getUserEvents);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent)

module.exports = router;