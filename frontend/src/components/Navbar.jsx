import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, User, ShoppingCart, LayoutDashboard, PlusCircle, Bookmark } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900 border-b-2 border-transparent group-hover:border-green-600 transition-all">
                        FarmConnect
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/marketplace" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Marketplace</Link>
                    {user && (
                        <>
                            {user.role === 'farmer' && (
                                <>
                                    <Link to="/farmer" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Dashboard</Link>
                                    <Link to="/my-crops" className="text-gray-600 hover:text-green-600 font-medium transition-colors">My Crops</Link>
                                </>
                            )}
                            {user.role === 'vendor' && (
                                <>
                                    <Link to="/vendor" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Dashboard</Link>
                                    <Link to="/post-requirement" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Post Requirement</Link>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-gray-50">
                                <User className="w-5 h-5" />
                                <span className="text-sm font-semibold hidden lg:inline">{user.name}</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-500 hover:text-white transition-all hover:bg-red-500 p-2 rounded-full border border-red-500/10"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors">Login</Link>
                            <Link to="/signup" className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-md shadow-green-600/20 active:scale-95">Signup</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
