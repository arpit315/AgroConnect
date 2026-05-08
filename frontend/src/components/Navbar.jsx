import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, User, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
            <div className="container mx-auto px-6">
                <div className={`glass rounded-3xl transition-all duration-500 px-6 h-16 flex items-center justify-between ${isScrolled ? 'bg-white/80' : 'bg-white/40'}`}>
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tighter text-gray-900">
                            Farm<span className="text-primary-600">Connect</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        <Link to="/marketplace" className="text-gray-600 hover:text-primary-600 font-semibold transition-colors text-sm">Marketplace</Link>
                        <Link to="/#features" className="text-gray-600 hover:text-primary-600 font-semibold transition-colors text-sm">Features</Link>
                        <Link to="/#about" className="text-gray-600 hover:text-primary-600 font-semibold transition-colors text-sm">About</Link>
                        {user && (
                            <>
                                {user.role === 'farmer' && (
                                    <Link to="/farmer" className="text-gray-600 hover:text-primary-600 font-semibold transition-colors text-sm">Dashboard</Link>
                                )}
                                {user.role === 'vendor' && (
                                    <Link to="/vendor" className="text-gray-600 hover:text-primary-600 font-semibold transition-colors text-sm">Dashboard</Link>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:bg-white/50 transition-all px-3 py-1.5 rounded-xl border border-transparent hover:border-white/40">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold hidden lg:inline">{user.name}</span>
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="px-5 py-2 text-gray-700 hover:text-primary-600 font-bold text-sm transition-colors">Login</Link>
                                <Link to="/signup" className="btn-gradient px-6 py-2.5 rounded-xl font-bold text-sm active:scale-95">Signup</Link>
                            </div>
                        )}
                        
                        <button 
                            className="md:hidden p-2 text-gray-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 p-6">
                    <div className="glass rounded-3xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                        <Link to="/marketplace" className="text-gray-600 font-bold py-2">Marketplace</Link>
                        <Link to="/#features" className="text-gray-600 font-bold py-2">Features</Link>
                        <Link to="/#about" className="text-gray-600 font-bold py-2">About</Link>
                        {!user && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                <Link to="/login" className="text-center font-bold py-2">Login</Link>
                                <Link to="/signup" className="btn-gradient text-center py-3 rounded-2xl font-bold">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

