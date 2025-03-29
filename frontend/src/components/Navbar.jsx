import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-primary p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link to="/" className="text-xl font-bold text-neutralWhite sm:text-2xl">
            EcoAgriNet
          </Link>
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-4 sm:mt-0`}
        >
          <Link to="/forum" className="text-neutralWhite hover:text-accent text-sm sm:text-base">
            Forum
          </Link>
          <Link to="/marketplace" className="text-neutralWhite hover:text-accent text-sm sm:text-base">
            Marketplace
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="text-neutralWhite hover:text-accent">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
                className="text-neutralWhite hover:text-accent text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-neutralWhite hover:text-accent text-sm sm:text-base">
                Login
              </Link>
              <Link to="/register" className="text-neutralWhite hover:text-accent text-sm sm:text-base">
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