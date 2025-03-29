import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(res.data.token);
      localStorage.setItem('userId', res.data.userId);
      setMessage('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutralWhite flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
          <h1 className="text-2xl font-bold text-neutralBlack mb-6 text-center sm:text-3xl">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-neutralBlack mb-2 text-sm sm:text-base" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-neutralBlack mb-2 text-sm sm:text-base" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded text-sm sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-neutralWhite p-2 rounded text-base font-semibold hover:bg-accent transition duration-300 disabled:bg-gray-400 sm:text-lg sm:p-3"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-neutralWhite"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-neutralBlack text-sm sm:text-base">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;