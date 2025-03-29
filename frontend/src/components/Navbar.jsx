import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Navbar() {
  const { token, logout } = useAuth(); // Use useAuth to access token and logout function

  return (
    <nav className="bg-primary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-neutralWhite">
          EcoAgriNet
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/forum" className="text-neutralWhite hover:text-accent">
            Forum
          </Link>
          <Link to="/marketplace" className="text-neutralWhite hover:text-accent">
            Marketplace
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="text-neutralWhite hover:text-accent">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <button
                onClick={logout}
                className="text-neutralWhite hover:text-accent"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-neutralWhite hover:text-accent">
                Login
              </Link>
              <Link to="/register" className="text-neutralWhite hover:text-accent">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
