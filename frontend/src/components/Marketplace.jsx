import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Marketplace() {
  const [listings, setListings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editId) {
        await axios.put(`${API_URL}/marketplace/${editId}`, { title, description, price }, {
          headers: { 'x-auth-token': token },
        });
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/marketplace`, { title, description, price }, {
          headers: { 'x-auth-token': token },
        });
      }
      setTitle('');
      setDescription('');
      setPrice('');
      fetchListings();
    } catch (err) {
      setError('Failed to save listing. Please login or try again.');
    }
  };

  const handleEdit = (listing) => {
    setEditId(listing._id);
    setTitle(listing.title);
    setDescription(listing.description);
    setPrice(listing.price);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/marketplace/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchListings();
    } catch (err) {
      setError('Failed to delete listing. You may not have permission.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutralBlack mb-6">Marketplace</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-neutralWhite p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Listing Title"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price ($)"
          className="w-full p-2 mb-4 border rounded"
          step="0.01"
          required
        />
        <button type="submit" className="bg-primary text-neutralWhite p-2 rounded hover:bg-accent">
          {editId ? 'Update Listing' : 'Create Listing'}
        </button>
      </form>
      <div className="space-y-4">
        {listings.map(listing => (
          <div key={listing._id} className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary">{listing.title}</h2>
            <p className="text-neutralBlack">{listing.description}</p>
            <p className="text-neutralBlack">Price: ${listing.price}</p>
            <p className="text-sm text-gray-500">By {listing.user.name} on {new Date(listing.createdAt).toLocaleDateString()}</p>
            {listing.user._id === localStorage.getItem('userId') && (
                <>
                  <button onClick={() => handleEdit(listing)} className="text-accent">Edit</button>
                  <button onClick={() => handleDelete(listing._id)} className="text-red-500">Delete</button>
                </>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;