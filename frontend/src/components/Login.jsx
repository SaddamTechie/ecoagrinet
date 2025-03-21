import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setMessage('Login successful!');
      navigate('/'); // Redirect to Dashboard
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