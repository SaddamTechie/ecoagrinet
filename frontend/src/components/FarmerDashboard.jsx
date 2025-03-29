import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from 'react-modal';

function FarmerDashboard() {
  const [listings, setListings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API_URL}/marketplace/mylistings`, {
        headers: { 'x-auth-token': token },
      });
      setListings(res.data);
    } catch (err) {
      setError('Failed to fetch listings.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/marketplace/${editId}`, { title, description, image, price }, {
          headers: { 'x-auth-token': token },
        });
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/marketplace`, { title, description, image, price }, {
          headers: { 'x-auth-token': token },
        });
      }
      setTitle('');
      setDescription('');
      setImage('');
      setPrice('');
      setModalIsOpen(false);
      fetchListings();
    } catch (err) {
      setError('Failed to save listing. Please login or try again.');
    }
  };

  const handleEdit = (listing) => {
    setEditId(listing._id);
    setTitle(listing.title);
    setDescription(listing.description);
    setImage(listing.image);
    setPrice(listing.price);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/marketplace/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchListings();
    } catch (err) {
      setError('Failed to delete listing. You may not have permission.');
    }
  };

  const handleAddClick = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setImage('');
    setPrice('');
    setModalIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutralWhite py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutralBlack mb-6 sm:text-3xl">Farmer Dashboard</h1>
        {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddClick}
            className="bg-primary text-neutralWhite px-4 py-2 rounded hover:bg-accent text-sm sm:text-base sm:px-6"
          >
            Add Listing
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="modal w-full max-w-sm mx-4 sm:max-w-md"
          overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <form onSubmit={handleSubmit} className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Listing Title"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price ($)"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              step="0.01"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-neutralWhite p-2 rounded hover:bg-accent text-sm sm:text-base sm:p-3"
            >
              {editId ? 'Update Listing' : 'Create Listing'}
            </button>
          </form>
        </Modal>
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
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(listing)}
                  className="text-accent text-sm sm:text-base hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="text-red-500 text-sm sm:text-base hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;