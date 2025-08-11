import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const token = localStorage.getItem('token');
const res = await api.get('/api/events', {
  headers: { Authorization: `Bearer ${token}` },
});


function Events() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

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

            navigate('/dashboard')

        } catch (err) {
            setError('Failed to add event');
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
        </div>
    );

};

export default Events;