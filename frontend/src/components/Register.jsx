import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });
      setMessage('Registration successful! Please login.');
      navigate('/login'); // Redirect to Login
    } catch (err) {
      setMessage('Registration failed. Email may already be in use.');
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="bg-neutralWhite p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-neutralBlack mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-neutralBlack mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-neutralBlack mb-2" htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-neutralWhite p-2 rounded hover:bg-accent"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-neutralBlack">{message}</p>}
      </div>
    </div>
  );
}

export default Register;