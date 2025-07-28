import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Events() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTime, setEditTime] = useState('');
    const [editDate, setEditDate] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const startEdit = (event) => {
        setEditingEvent(event);
        setEditTitle(event.title);
        setEditTime(event.time);
        setEditDate(event.date);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(res.data);
            } catch (err) {
                setError('Failed to fetch events');
            }
        };

        fetchEvents();
    }, [token]);

    const handleAddEvent = async (e) => {
        e.preventDefault();
        console.log("Submitting title:", title)
        console.log("Token", token)
        try {
            const res = await axios.post(
                'http://localhost:5000/api/events',
                {
                    time,
                    title,
                    date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setEvents([...events, res.data]);
            setDate('');
            setTime('');
            setTitle('');
        } catch (err) {
            setError('Failed to add event');
        }
    };

    const handleDelete = async (id) => {

        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Refresh events
            setEvents(events.filter((e) => e._id !== id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleUpdate = async () => {
        if (!editTitle || !editTime || !editDate) {
            alert('All fields are required');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const res = await axios.put(
                `http://localhost:5000/api/events/${editingEvent._id}`,
                {
                    title: editTitle,
                    time: editTime,
                    date: editDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update UI
            setEvents(events.map((e) => (e._id === res.data._id ? res.data : e)));

            // Clear edit form
            setEditingEvent(null);
        } catch (err) {
            console.error('Update error:', err.response?.data || err.message);
        }
    };

    return (
        <div className="container">
            <h2>Your Events</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddEvent}>
                <input
                    type="text"
                    placeholder="Event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                /><br />
                <input
                    type="text"
                    placeholder="Event time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                /><br />
                <input
                    type="text"
                    placeholder="Event date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                /><br />
                <button onClick={handleAddEvent}>Add Event</button>
            </form>
            {events.map((event) => (
                <div key={event._id}>
                    {editingEvent && editingEvent._id === event._id ? (
                        <div>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                            />
                            <input
                                type="time"
                                value={editTime}
                                onChange={(e) => setEditTime(e.target.value)}
                                placeholder="Time"
                            />
                            <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                placeholder="Date"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingEvent(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>{event.title}</strong> — {event.time} on {event.date}</p>
                            <button onClick={() => startEdit(event)}>Edit</button>
                            <button onClick={() => handleDelete(event._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

};

export default Events;