import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaComments, FaStore, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaLeaf } from 'react-icons/fa';

function Navbar() {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-neutralWhite shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold hover:text-accent transition duration-200">
          <FaLeaf className="w-6 h-6 sm:w-8 sm:h-8" />
          EcoAgriNet
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="sm:hidden text-neutralWhite focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-primary sm:bg-transparent p-4 sm:p-0 transition-all duration-300`}
        >
          {/* Always Visible Links */}
          <Link to="/" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
            <FaHome className="w-4 h-4 sm:w-5 sm:h-5" /> Home
          </Link>
          <Link to="/forum" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
            <FaComments className="w-4 h-4 sm:w-5 sm:h-5" /> Forum
          </Link>
          <Link to="/marketplace" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
            <FaStore className="w-4 h-4 sm:w-5 sm:h-5" /> Marketplace
          </Link>
          <Link to="/api-docs" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
            <FaLeaf className="w-4 h-4 sm:w-5 sm:h-5" /> API Docs
          </Link>

          {/* Conditional Links Based on Authentication */}
          {token ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
                <FaUser className="w-4 h-4 sm:w-5 sm:h-5" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200"
              >
                <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
                <FaSignInAlt className="w-4 h-4 sm:w-5 sm:h-5" /> Login
              </Link>
              <Link to="/register" className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200">
                <FaUserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;