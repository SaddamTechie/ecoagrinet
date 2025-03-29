import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Marketplace() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API_URL}/marketplace`);
      setListings(res.data);
    } catch (err) {
      setError('Failed to fetch listings.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutralBlack mb-6">Marketplace</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing._id} className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold text-secondary">{listing.title}</h2>
            <p className="text-neutralBlack">{listing.description}</p>
            <p className="text-neutralBlack">Price: ${listing.price}</p>
            <p className="text-sm text-gray-500">By {listing.user.name} on {new Date(listing.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
