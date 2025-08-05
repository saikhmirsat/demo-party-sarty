import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import RegistrationForm from "./pages/RegistrationForm";
import QRCodeViewer from "./components/QRCodeViewer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register/:urlId" element={<RegistrationForm />} />
          <Route path="/student/:uniqueId" element={<QRCodeViewer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
