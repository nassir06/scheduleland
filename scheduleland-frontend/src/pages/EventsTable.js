import React from 'react';
import './EventsTable.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const token = localStorage.getItem('token');
const res = await api.get('/api/events', {
  headers: { Authorization: `Bearer ${token}` },
});


function EventsTable({ events, startEdit, handleDelete }) {

    const navigate = useNavigate();

    const EventsPage = async (e) => {
        e.preventDefault();

        navigate('/events')

    }

    return (
        <div className="table-container">
            <h2>My Events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>
                                <button
                                    className="action-btn edit-btn"
                                    onClick={() => startEdit(event)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p> </p>
            <button onClick={EventsPage}>Add Event</button>
        </div>
    );
}

export default EventsTable;