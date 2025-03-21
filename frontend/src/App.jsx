import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Forum from './components/Forum';
import Marketplace from './components/Marketplace';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set true if token exists
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-neutralWhite flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Landing />}
            />
            <Route path="/forum" element={<Forum />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/login" element={ isAuthenticated? <Profile setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={ isAuthenticated? <Profile setIsAuthenticated={setIsAuthenticated} /> : <Register />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <footer className="bg-secondary text-neutralWhite p-4 text-center">
          © 2025 EcoAgriNet. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;