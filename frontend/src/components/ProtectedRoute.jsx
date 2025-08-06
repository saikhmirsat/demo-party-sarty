// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useAuth();
  
  // If a token exists, the user is authenticated, so render the nested routes.
  if (token) {
    return <Outlet />;
  }

  // If no token, redirect them to the login page (which is your "/" route).
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;