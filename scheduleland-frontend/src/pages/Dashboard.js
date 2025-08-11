import React, { useEffect, useState } from 'react';
import EventsTable from './EventsTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const token = localStorage.getItem('token');
const res = await api.get('/api/events', {
  headers: { Authorization: `Bearer ${token}` },
});


function Dashboard() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null); // holds the event to edit
    const [showModal, setShowModal] = useState(false); // controls visibility

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalStyle = {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    };

    const navigate = useNavigate();

    const EventsPage = async (e) => {
        e.preventDefault();

        navigate('/events')
    }

    // Fetch events when the dashboard loads
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(res.data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            }
        };

        fetchEvents();
    }, []);

    const startEdit = (event) => {
        setEditingEvent({ ...event }); // copy the current event
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(
                `http://localhost:5000/api/events/${editingEvent._id}`,
                {
                    title: editingEvent.title,
                    date: editingEvent.date,
                    time: editingEvent.time,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update event in state
            setEvents(events.map((e) => (e._id === res.data._id ? res.data : e)));
            setShowModal(false); // close modal
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this event?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove from UI
            setEvents((prev) => prev.filter((e) => e._id !== id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            {events.length > 0 ? (
                <EventsTable
                    events={events}
                    startEdit={startEdit}
                    handleDelete={handleDelete}
                />
            ) : (
                <>
                    <p>No events yet.</p>
                    <button onClick={EventsPage}>Add Event</button>
                </>
            )}

            {
                showModal && (
                    <div style={modalOverlayStyle}>
                        <div style={modalStyle}>
                            <h3>Edit Event</h3>
                            <input
                                type="text"
                                placeholder="Title"
                                value={editingEvent.title}
                                onChange={(e) =>
                                    setEditingEvent({ ...editingEvent, title: e.target.value })
                                }
                            />
                            <input
                                type="date"
                                value={editingEvent.date}
                                onChange={(e) =>
                                    setEditingEvent({ ...editingEvent, date: e.target.value })
                                }
                            />
                            <input
                                type="time"
                                value={editingEvent.time}
                                onChange={(e) =>
                                    setEditingEvent({ ...editingEvent, time: e.target.value })
                                }
                            />
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
};

export default Dashboard;