import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from 'react-modal';
import { FaPlus, FaEdit, FaTrash, FaStore, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'sonner';

Modal.setAppElement('#root'); // Accessibility requirement for react-modal

function FarmerDashboard() {
  const [listings, setListings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/marketplace/mylistings`, {
        headers: { 'x-auth-token': token },
      });
      setListings(res.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      } else {
        setError('Failed to fetch listings. Please try again later.');
        toast.error('Failed to load listings.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/marketplace/${editId}`, { title, description, image, price }, {
          headers: { 'x-auth-token': token },
        });
        toast.success('Listing updated successfully!');
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/marketplace`, { title, description, image, price }, {
          headers: { 'x-auth-token': token },
        });
        toast.success('Listing created successfully!');
      }
      setTitle('');
      setDescription('');
      setImage('');
      setPrice('');
      setModalIsOpen(false);
      fetchListings();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to save listing. Please try again.');
      }
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
      toast.success('Listing deleted successfully!');
      fetchListings();
      setDeleteConfirmId(null);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to delete listing. You may not have permission.');
      }
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutralBlack sm:text-4xl">Farmer Dashboard</h1>
          <Link
            to="/marketplace"
            className="mt-4 sm:mt-0 flex items-center gap-2 text-primary hover:text-accent transition duration-200 text-sm sm:text-base"
          >
            <FaStore className="w-5 h-5" /> View Marketplace
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-lg mb-6 flex items-center gap-2">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Add Listing Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddClick}
            className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm sm:text-base hover:bg-accent transition duration-300 shadow-md"
          >
            <FaPlus className="w-4 h-4" /> Add Listing
          </button>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-neutralBlack mb-4 sm:text-2xl">No Listings Yet</h2>
              <p className="text-sm text-gray-600 mb-6 sm:text-base">
                Add your first listing to start selling your produce!
              </p>
              <button
                onClick={handleAddClick}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm sm:text-base hover:bg-accent transition duration-300"
              >
                Create Listing
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {listings.map(listing => (
              <div key={listing._id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found')}
                />
                <h2 className="text-lg font-semibold text-primary mb-2 sm:text-xl truncate">{listing.title}</h2>
                <p className="text-gray-700 text-sm sm:text-base line-clamp-2">{listing.description}</p>
                <p className="text-gray-800 font-medium mt-2 text-sm sm:text-base">Price: Ksh{parseFloat(listing.price).toFixed(2)}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="text-accent hover:text-primary transition duration-200 flex items-center gap-1 text-sm sm:text-base"
                  >
                    <FaEdit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(listing._id)}
                    className="text-red-500 hover:text-red-700 transition duration-200 flex items-center gap-1 text-sm sm:text-base"
                  >
                    <FaTrash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add/Edit Listing */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="w-full max-w-sm sm:max-w-md mx-4 bg-white p-6 rounded-xl shadow-2xl"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center"
        >
          <h2 className="text-xl font-semibold text-neutralBlack mb-6 sm:text-2xl">
            {editId ? 'Edit Listing' : 'Add New Listing'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Fresh Organic Tomatoes"
                className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Grown sustainably, available in bulk"
                className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="e.g., https://example.com/image.jpg"
                className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm sm:text-base">Price (Ksh)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 2.50"
                className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition duration-200 text-sm sm:text-base"
              >
                {editId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="text-gray-700 hover:text-red-500 transition duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <Modal
            isOpen={!!deleteConfirmId}
            onRequestClose={() => setDeleteConfirmId(null)}
            className="w-full max-w-sm sm:max-w-md mx-4 bg-white p-6 rounded-xl shadow-2xl"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center"
          >
            <h2 className="text-xl font-semibold text-neutralBlack mb-4 sm:text-2xl">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm sm:text-base"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="text-gray-700 hover:text-red-500 transition duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default FarmerDashboard;