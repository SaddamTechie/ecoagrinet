import React from 'react';
import { Link } from 'react-router-dom';


function Landing() {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL)
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-neutralBlack mb-4">Welcome to EcoAgriNet</h1>
      <p className="text-lg text-neutralBlack mb-6">
        Empowering sustainable agriculture with tools, community, and markets.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-primary text-neutralWhite px-6 py-2 rounded hover:bg-accent"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-secondary text-neutralWhite px-6 py-2 rounded hover:bg-accent"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Landing;