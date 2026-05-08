import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, ClipboardList, PlusCircle, TrendingUp, Users, ArrowRight, Loader, Tag, MapPin } from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';

const FarmerDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ crops: 0, requirements: 0 });
    const [recentCrops, setRecentCrops] = useState([]);
    const [recentRequirements, setRecentRequirements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [cropsRes, reqRes] = await Promise.all([
                api.get('/my-crops'),
                api.get('/requirements')
            ]);
            setStats({
                crops: cropsRes.data.length,
                requirements: reqRes.data.length
            });
            setRecentCrops(cropsRes.data.slice(0, 3));
            setRecentRequirements(reqRes.data.slice(0, 3));
        } catch (err) {
            console.error('Failed to fetch dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-500 font-bold">Assembling your farm overview...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Farmer <span className="text-green-600 tracking-tighter">Dashboard</span></h1>
                    <p className="text-gray-500 font-medium text-lg mt-2">Welcome back, {user?.name}. Manage your harvests and connect with vendors.</p>
                </div>
                <Link to="/add-crop" className="px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all font-bold text-lg shadow-xl shadow-green-600/30 flex items-center gap-2 group active:scale-95">
                    <PlusCircle className="w-6 h-6" />
                    List New Crop
                </Link>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-between group hover:border-green-300 transition-all">
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">My Active Listings</p>
                        <p className="text-5xl font-black text-gray-900 mt-2">{stats.crops}</p>
                    </div>
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                </div>

                <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-between group hover:border-blue-300 transition-all">
                    <div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Live Market Req's</p>
                        <p className="text-5xl font-black text-gray-900 mt-2">{stats.requirements}</p>
                    </div>
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ClipboardList className="w-8 h-8" />
                    </div>
                </div>

                <div className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-900/20 flex items-center justify-between group relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-600/10 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Profile Status</p>
                        <p className="text-2xl font-black text-white mt-2">Verified Farmer</p>
                    </div>
                    <div className="relative z-10 w-16 h-16 bg-white/10 text-white rounded-3xl flex items-center justify-center">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Weather Widget */}
                <div className="lg:col-span-1">
                    <WeatherWidget location={user?.location || "Farm"} />
                </div>
                
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-10">
                    {/* My Crops Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-green-600" />
                            Recent Listings
                        </h2>
                        <Link to="/my-crops" className="text-sm font-bold text-green-600 hover:underline flex items-center gap-1 group">
                            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="space-y-4">
                        {recentCrops.length > 0 ? recentCrops.map(crop => (
                            <div key={crop.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                    <img 
                                        src={crop.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200'}
                                        alt={crop.crop_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{crop.crop_name}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm font-black text-green-600">₹{crop.price}/unit</span>
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {crop.location}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/crops/${crop.id}`} className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:text-green-600 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        )) : (
                            <div className="p-12 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                                <PlusCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold">No crops listed yet.</p>
                                <Link to="/add-crop" className="text-green-600 font-black text-sm hover:underline mt-2 inline-block">Start listing harvests</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vendor Requirements Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <ClipboardList className="w-6 h-6 text-blue-600" />
                            Market Requirements
                        </h2>
                    </div>
                    
                    <div className="space-y-4">
                        {recentRequirements.length > 0 ? recentRequirements.map(req => (
                            <div key={req.id} className="bg-white p-6 rounded-3xl border border-gray-100 border-l-4 border-l-blue-600 shadow-sm hover:shadow-lg transition-all flex items-center justify-between">
                                <div>
                                    <h3 className="font-black text-gray-900 uppercase tracking-tight">{req.crop_name}</h3>
                                    <p className="text-sm font-medium text-gray-500 mt-1">
                                        Qty Required: <span className="font-black text-gray-700">{req.quantity} units</span>
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">Budget: ₹{req.budget}</span>
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
                                    </div>
                                </div>
                                <div className="text-center bg-gray-50 px-4 py-2 rounded-2xl">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mx-auto mb-1">
                                        {req.vendor?.name?.charAt(0) || 'V'}
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase">{req.vendor?.name}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold">No current market requests.</p>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
