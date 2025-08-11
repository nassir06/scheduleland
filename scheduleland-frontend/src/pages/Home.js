import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const token = localStorage.getItem('token');
const res = await api.get('/api/events', {
  headers: { Authorization: `Bearer ${token}` },
});


function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📅 ScheduleLand</h1>
            <p style={styles.description}>
                Organize your life. Create, edit, and track your daily events and routines — anytime, anywhere.
            </p>

            <div style={styles.buttonContainer}>
                <Link to="/login">
                    <button style={styles.button}>Login</button>
                </Link>
                <Link to="/register">
                    <button style={styles.buttonOutline}>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '80px 20px',
        backgroundColor: '#f4f6f8',
        height: '100vh',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        maxWidth: '500px',
        margin: '0 auto 40px',
        color: '#555',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    buttonOutline: {
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#fff',
        color: '#007bff',
        border: '2px solid #007bff',
        borderRadius: '6px',
        cursor: 'pointer',
    },
};

export default Home;