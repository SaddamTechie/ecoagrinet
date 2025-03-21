import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile({ setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { 'x-auth-token': token },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!user) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="bg-neutralWhite p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-neutralBlack mb-6 text-center">Profile</h1>
        <div className="mb-4">
          <p className="text-neutralBlack"><strong>Name:</strong> {user.name}</p>
          <p className="text-neutralBlack"><strong>Email:</strong> {user.email}</p>
          <p className="text-neutralBlack"><strong>Role:</strong> {user.role}</p>
          <p className="text-neutralBlack"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-neutralWhite p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;