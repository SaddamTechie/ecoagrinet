import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutralBlack mb-8 sm:text-4xl text-center">Marketplace</h1>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-red-600 mb-4 sm:text-2xl flex items-center justify-center gap-2">
                <FaExclamationCircle className="w-6 h-6" /> Oops! Something Went Wrong
              </h2>
              <p className="text-sm text-red-600 mb-6 sm:text-base">{error}</p>
              <button
                onClick={fetchListings}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Retry
              </button>
              <p className="mt-4 text-sm text-gray-700 sm:text-base">
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
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-neutralBlack mb-4 sm:text-2xl">No Listings Available</h2>
              <p className="text-sm text-gray-600 mb-6 sm:text-base">
                It looks like there are no products in the marketplace yet. Check back later!
              </p>
              <button
                onClick={fetchListings}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {listings.map(listing => (
              <Link
                key={listing._id}
                to={`/marketplace/${listing._id}`}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found')}
                />
                <h2 className="text-lg font-semibold text-primary mb-2 sm:text-xl truncate">{listing.title}</h2>
                <p className="text-gray-700 text-sm sm:text-base line-clamp-2">{listing.description}</p>
                <p className="text-gray-800 font-medium mt-2 text-sm sm:text-base">
                  Ksh{parseFloat(listing.price).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-2 sm:text-sm">
                  By {listing.user.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;