import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, UserCheck, AlertCircle } from 'lucide-react';

const Signup = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer'
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await register(userData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please check your information.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-green-600/30">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 pt-4">Create Account</h2>
                    <p className="text-gray-500 font-medium">Join our growing community today</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-semibold">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                            <input
                                type="password"
                                required
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                placeholder="Minimum 8 characters"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700 ml-1">Select your Role</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setUserData({ ...userData, role: 'farmer' })}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                                    userData.role === 'farmer' 
                                    ? 'border-green-600 bg-green-50' 
                                    : 'border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <span className={`text-sm font-black ${userData.role === 'farmer' ? 'text-green-700' : 'text-gray-500'}`}>FARMER</span>
                                <p className="text-xs text-center text-gray-400">I want to sell my crops</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserData({ ...userData, role: 'vendor' })}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                                    userData.role === 'vendor' 
                                    ? 'border-blue-600 bg-blue-50' 
                                    : 'border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <span className={`text-sm font-black ${userData.role === 'vendor' ? 'text-blue-700' : 'text-gray-500'}`}>VENDOR</span>
                                <p className="text-xs text-center text-gray-400">I want to buy crops</p>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all font-bold text-lg shadow-xl shadow-green-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>

                <p className="text-center text-gray-500 font-medium">
                    Already have an account? {' '}
                    <Link to="/login" className="text-green-600 hover:underline font-bold">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
