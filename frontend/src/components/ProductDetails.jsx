import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaDollarSign, FaExclamationCircle, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/marketplace/${id}`);
      setProduct(res.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Product not found.');
      } else {
        setError('Failed to load product details. Please try again later.');
      }
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = (phone) => {
    if (!phone) {
      toast.error('Seller phone number is not available.');
      return;
    }

    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    // Convert Kenyan format (07XXXXXXXX) to international format (+254XXXXXXXX)
    let formattedPhone = cleanPhone;
    if (cleanPhone.startsWith('07') && cleanPhone.length === 10) {
      formattedPhone = `254${cleanPhone.slice(1)}`; // Replace '07' with '254'
    } else if (!cleanPhone.startsWith('254')) {
      toast.error('Invalid phone number format. Expected format: 0712345678');
      return;
    }

    // Pre-filled message with product name and image
    const message = `Hello! I'm interested in your product: *${product.title}*. Here's the image: ${product.image}. Can you tell me more about it?`;
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    // Toast feedback
    toast.success(`Opening WhatsApp chat with seller for ${product.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition duration-200 text-sm sm:text-base mb-6"
        >
          <FaArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>

        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto animate-pulse">
            <div className="w-full h-64 sm:h-96 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-red-600 mb-4 sm:text-2xl flex items-center justify-center gap-2">
                <FaExclamationCircle className="w-6 h-6" /> Oops! Something Went Wrong
              </h2>
              <p className="text-sm text-red-600 mb-6 sm:text-base">{error}</p>
              <button
                onClick={fetchProduct}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Retry
              </button>
              <p className="mt-4 text-sm text-gray-700 sm:text-base">
                Or return to{' '}
                <Link to="/marketplace" className="text-secondary hover:underline">
                  Marketplace
                </Link>
                .
              </p>
            </div>
          </div>
        ) : product ? (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 sm:h-96 object-cover rounded-lg mb-6"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found')}
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{product.title}</h1>
            <p className="text-gray-700 text-base sm:text-lg mb-6">{product.description}</p>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-gray-800 text-base sm:text-lg">
                <FaDollarSign className="w-5 h-5 text-primary" />
                <span className="font-medium">Price:</span> Ksh{parseFloat(product.price).toFixed(2)}
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                <FaUser className="w-5 h-5 text-primary" />
                <span className="font-medium">Seller:</span> {product.user.name}
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                <FaCalendarAlt className="w-5 h-5 text-primary" />
                <span className="font-medium">Posted:</span> {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleContactSeller(product.user.phone)}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base hover:bg-accent transition duration-300 w-full sm:w-auto justify-center"
            >
              <FaWhatsapp className="w-5 h-5" /> Buy via Whatsapp
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetails;