const Event = require('../models/Event');

// Create a new event
// POST /api/events
// Private (auth required)
const createEvent = async (req, res) => {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const event = await Event.create({
            title,
            date,
            time,
            user: req.user._id // comes from JWT middleware
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all events for logged-in user
// GET /api/events
// Private
const getUserEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user._id }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error: error.message });
    }
};

// Update an existing event
// PUT /api/events/:id
// Private
const updateEvent = async (req, res) => {
    const { title, date, time } = req.body;

    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this event' });
        }

        event.title = title || event.title;
        event.date = date || event.date;
        event.time = time || event.time;

        const updated = await event.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update event', error: error.message });
    }
};

// Delete an event
// DELETE /api/events/:id
// Private
const deleteEvent = async (req, res) => {
try {
const event = await Event.findById(req.params.id);

if (!event) {
return res.status(404).json({ message: 'Event not found' });
}

if (event.user.toString() !== req.user._id.toString()) {
return res.status(401).json({ message: 'Not authorized to delete this event' });
}

await event.deleteOne();
res.json({ message: 'Event deleted successfully' });
} catch (error) {
res.status(500).json({ message: 'Failed to delete event', error: error.message });
}
};

module.exports = {
    createEvent,
    getUserEvents,
    deleteEvent,
    updateEvent
};
