import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Forum from './components/Forum';
import Marketplace from './components/Marketplace';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FarmerDashboard from './components/FarmerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutralWhite flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Conditional rendering for "/" */}
              <Route path="/" element={<ConditionalRoute />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={<ProtectedRoute component={Profile} />}
              />
              <Route
                path="/dashboard"
                element={<ProtectedRoute component={FarmerDashboard} />}
              />
            </Routes>
          </main>
          <footer className="bg-secondary text-neutralWhite p-4 text-center">
            &copy; 2025 EcoAgriNet. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Conditional Route for "/"
function ConditionalRoute() {
  const { token } = useAuth();

  return token ? (
    <Dashboard /> // Render Dashboard if logged in
  ) : (
    <Landing /> // Render LandingPage if logged out
  );
}

// Protected Route Component
function ProtectedRoute({ component: Component }) {
  const { token } = useAuth();

  return token ? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
