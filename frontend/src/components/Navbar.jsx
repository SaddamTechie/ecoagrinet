import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-neutralWhite">
          EcoAgriNet
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-neutralWhite hover:text-accent">
            Dashboard
          </Link>
          <Link to="/forum" className="text-neutralWhite hover:text-accent">
            Forum
          </Link>
          <Link to="/marketplace" className="text-neutralWhite hover:text-accent">
            Marketplace
          </Link>
          <Link to="/login" className="text-neutralWhite hover:text-accent">
            Login
          </Link>
          <Link to="/register" className="text-neutralWhite hover:text-accent">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;