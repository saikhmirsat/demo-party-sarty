import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import RegistrationForm from "./pages/RegistrationForm";
import QRCodeViewer from "./components/QRCodeViewer";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import useAuth
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// A component to handle redirection for the root path
const HomeRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <AdminLogin />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* If already logged in, redirect from "/" to "/dashboard" */}
          <Route path="/" element={<HomeRedirect />} />
          
          {/* Public route for registration form */}
          <Route path="/register/:urlId" element={<RegistrationForm />} />
          
          {/* Public route for QR Code Viewer */}
          <Route path="/student/:uniqueId" element={<QRCodeViewer />} />

          {/* Protected Routes: These routes require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add any other routes that should only be accessible when logged in here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;