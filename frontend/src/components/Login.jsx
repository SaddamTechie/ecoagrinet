import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Login() {
  const { login } = useAuth(); // Use login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(res.data.token); 
      localStorage.setItem('userId', res.data.userId); // Store userId
      setMessage('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="bg-neutralWhite p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-neutralBlack mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-neutralBlack mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-neutralBlack mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-neutralWhite p-2 rounded hover:bg-accent"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-neutralBlack">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
