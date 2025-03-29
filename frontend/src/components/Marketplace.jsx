import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Marketplace() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/marketplace`);
      setListings(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch listings. Please try again later.');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutralWhite py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutralBlack mb-6 sm:text-3xl">Marketplace</h1>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neutralWhite p-4 rounded-lg shadow-md animate-pulse">
                <div className="w-full h-32 sm:h-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-red-600 mb-4 sm:text-2xl">Oops! Something Went Wrong</h2>
              <p className="text-sm text-red-600 mb-6 sm:text-base">{error}</p>
              <button
                onClick={fetchListings}
                className="bg-primary text-neutralWhite px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Retry
              </button>
              <p className="mt-4 text-sm text-neutralBlack sm:text-base">
                If the problem persists,{' '}
                <Link to="/support" className="text-secondary hover:underline">
                  contact support
                </Link>
                .
              </p>
            </div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-neutralBlack mb-4 sm:text-2xl">No Listings Available</h2>
              <p className="text-sm text-neutralBlack mb-6 sm:text-base">
                It looks like there are no products in the marketplace yet. Check back later!
              </p>
              <button
                onClick={fetchListings}
                className="bg-primary text-neutralWhite px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {listings.map(listing => (
              <div key={listing._id} className="bg-neutralWhite p-4 rounded-lg shadow-md">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-32 sm:h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">{listing.title}</h2>
                <p className="text-neutralBlack text-sm sm:text-base">{listing.description}</p>
                <p className="text-neutralBlack text-sm sm:text-base">Price: ${listing.price}</p>
                <p className="text-xs text-gray-500 mt-2 sm:text-sm">
                  By {listing.user.name} on {new Date(listing.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;