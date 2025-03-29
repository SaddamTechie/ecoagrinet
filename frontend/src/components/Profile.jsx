import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: { 'x-auth-token': token },
        });
        setUser(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutralWhite py-6 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm sm:max-w-md sm:p-6">
          <h1 className="text-2xl font-bold text-neutralBlack mb-6 text-center sm:text-3xl">Your Profile</h1>

          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-6"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-sm text-red-600 font-semibold sm:text-base">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-primary text-neutralWhite px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-6"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : user ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-neutralWhite">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-neutralBlack sm:text-xl">{user.name}</h2>
                <p className="text-sm text-gray-500 sm:text-base">{user.role}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm font-medium text-neutralBlack sm:text-base">Email:</span>
                  <span className="text-sm text-gray-700 sm:text-base">{user.email}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm font-medium text-neutralBlack sm:text-base">Joined:</span>
                  <span className="text-sm text-gray-700 sm:text-base">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-6 bg-red-500 text-neutralWhite py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300 sm:text-base sm:py-3"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-neutralBlack sm:text-base">No profile data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;