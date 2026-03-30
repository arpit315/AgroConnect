import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Marketplace from './pages/Marketplace';
import CropDetails from './pages/CropDetails';
import FarmerDashboard from './pages/FarmerDashboard';
import AddCrop from './pages/AddCrop';
import MyCrops from './pages/MyCrops';
import VendorDashboard from './pages/VendorDashboard';
import PostRequirement from './pages/PostRequirement';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Shared Protected Routes */}
                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                            <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
                            <Route path="/crops/:id" element={<ProtectedRoute><CropDetails /></ProtectedRoute>} />

                            {/* Farmer Routes */}
                            <Route path="/farmer" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
                            <Route path="/add-crop" element={<ProtectedRoute role="farmer"><AddCrop /></ProtectedRoute>} />
                            <Route path="/my-crops" element={<ProtectedRoute role="farmer"><MyCrops /></ProtectedRoute>} />

                            {/* Vendor Routes */}
                            <Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
                            <Route path="/post-requirement" element={<ProtectedRoute role="vendor"><PostRequirement /></ProtectedRoute>} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
