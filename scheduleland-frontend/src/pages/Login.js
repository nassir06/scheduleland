import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const token = localStorage.getItem('token');
const res = await api.get('/api/events', {
  headers: { Authorization: `Bearer ${token}` },
});


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });

            // Save JWT token to localStorage
            localStorage.setItem('token', res.data.token);

            // Redirect to events or dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;