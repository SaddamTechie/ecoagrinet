import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
    setMessage(''); // Clear previous messages
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(res.data.token);
      localStorage.setItem('userId', res.data.userId);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1000); // Slight delay for user feedback
    } catch (err) {
      if (err.response) {
        // Backend responded with an error 
        if (err.response.status === 400) {
          setMessage('Invalid email or password. Please check your credentials.');
        } else {
          setMessage('An error occurred. Please try again later.');
        }
      } else if (err.request) {
        // No response from server (e.g., backend offline)
        setMessage('Unable to connect to the server. Please try again later.');
      } else {
        // Other errors (e.g., network issues)
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutralWhite flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm sm:p-6 sm:max-w-md">
          <h1 className="text-2xl font-bold text-neutralBlack mb-6 text-center sm:text-3xl">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-neutralBlack mb-2 text-sm sm:text-base" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-neutralBlack mb-2 text-sm sm:text-base" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-neutralWhite py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 disabled:bg-gray-400 sm:text-base sm:py-3"
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
            <p
              className={`mt-4 text-center text-sm sm:text-base ${
                message.includes('successful') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
          <p className="mt-4 text-center text-sm text-neutralBlack sm:text-base">
            Don’t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;