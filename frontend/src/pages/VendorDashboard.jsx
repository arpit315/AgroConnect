import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingCart, ClipboardList, PlusCircle, Search, TrendingUp, ArrowRight, Loader, Tag, MapPin, Users } from 'lucide-react';

const VendorDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ crops: 0, myReqs: 0 });
    const [recentCrops, setRecentCrops] = useState([]);
    const [myRequirements, setMyRequirements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [cropsRes, reqRes] = await Promise.all([
                api.get('/crops'),
                api.get('/my-requirements')
            ]);
            setStats({
                crops: cropsRes.data.length,
                myReqs: reqRes.data.length
            });
            setRecentCrops(cropsRes.data.slice(0, 4));
            setMyRequirements(reqRes.data.slice(0, 3));
        } catch (err) {
            console.error('Failed to fetch vendor dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-500 font-bold">Scanning the market for you...</p>
        </div>
    );

    return (
        <div className="space-y-12 py-6 animate-in fade-in duration-700">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Vendor <span className="text-blue-600 tracking-tighter">Panel</span></h1>
                    <p className="text-gray-500 font-medium text-lg mt-2">Hello, {user?.name}. Track market trends and manage your requirements.</p>
                </div>
                <Link to="/post-requirement" className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold text-lg shadow-xl shadow-blue-600/30 flex items-center gap-2 group active:scale-95">
                    <PlusCircle className="w-6 h-6" />
                    Post New Requirement
                </Link>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-between group hover:border-green-300 transition-all">
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Crops Listed</p>
                        <p className="text-5xl font-black text-gray-900 mt-2">{stats.crops}</p>
                    </div>
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingCart className="w-8 h-8" />
                    </div>
                </div>

                <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-between group hover:border-blue-300 transition-all">
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">My Requirements</p>
                        <p className="text-5xl font-black text-gray-900 mt-2">{stats.myReqs}</p>
                    </div>
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ClipboardList className="w-8 h-8" />
                    </div>
                </div>

                <div className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-900/20 flex items-center justify-between group relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Market Status</p>
                        <p className="text-2xl font-black text-white mt-2">B2B Verified</p>
                    </div>
                    <div className="relative z-10 w-16 h-16 bg-white/10 text-white rounded-3xl flex items-center justify-center">
                        <Users className="w-8 h-8" />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Marketplace Spotlight */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <Tag className="w-6 h-6 text-green-600" />
                            Marketplace Spotlight
                        </h2>
                        <Link to="/marketplace" className="text-sm font-bold text-green-600 hover:underline flex items-center gap-1 group">
                            Explore all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                        {recentCrops.map(crop => (
                            <Link key={crop.id} to={`/crops/${crop.id}`} className="block bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="h-40 overflow-hidden relative">
                                    <img src={crop.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600'} alt={crop.crop_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-green-700 font-black text-xs shadow-sm">${crop.price}/unit</div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-black text-gray-900 uppercase tracking-tighter truncate">{crop.crop_name}</h3>
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase mt-1">
                                        <MapPin className="w-3 h-3" /> {crop.location}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* My Active Requirements */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-blue-600" />
                        My Requirements
                    </h2>
                    
                    <div className="space-y-4">
                        {myRequirements.length > 0 ? myRequirements.map(req => (
                            <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-blue-200 transition-all space-y-4">
                                <div>
                                    <h3 className="font-black text-gray-900 uppercase tracking-tighter text-lg">{req.crop_name}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="text-xs font-bold text-gray-400 flex items-center gap-1"><ShoppingCart className="w-3.5 h-3.5" /> {req.quantity} units</div>
                                        <div className="text-xs font-bold text-blue-600 flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> ${req.budget} budget</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 bg-gray-50 p-2 rounded-xl">
                                    <MapPin className="w-3 h-3" /> <span>{req.location}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="p-10 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold">No requirements yet.</p>
                                <Link to="/post-requirement" className="text-blue-600 font-black text-xs hover:underline mt-1 inline-block">POST YOUR FIRST NEED</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
