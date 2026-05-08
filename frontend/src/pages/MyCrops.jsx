import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShoppingBag, Trash2, Edit3, MapPin, Tag, PlusCircle, ArrowRight, Loader, AlertTriangle, Eye } from 'lucide-react';

const MyCrops = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyCrops();
    }, []);

    const fetchMyCrops = async () => {
        setLoading(true);
        try {
            const res = await api.get('/my-crops');
            setCrops(res.data);
        } catch (err) {
            console.error('Failed to fetch my crops', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this listing?')) return;
        try {
            await api.delete(`/crops/${id}`);
            setCrops(crops.filter(c => c.id !== id));
        } catch (err) {
            alert('Failed to delete crop');
        }
    };

    return (
        <div className="space-y-10 py-6 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">My <span className="text-green-600 leading-none">Inventory</span></h1>
                    <p className="text-gray-500 font-medium text-lg mt-2">Manage your listed crops and track their status.</p>
                </div>
                <Link to="/add-crop" className="px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all font-bold text-lg shadow-xl shadow-green-600/30 flex items-center gap-2 group active:scale-95">
                    <PlusCircle className="w-6 h-6" />
                    New Listing
                </Link>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader className="w-12 h-12 text-green-600 animate-spin" />
                    <p className="text-gray-500 font-bold tracking-tight uppercase text-xs">Accessing Silos...</p>
                </div>
            ) : crops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {crops.map(crop => (
                        <div 
                            key={crop.id} 
                            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={crop.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600'} 
                                    alt={crop.crop_name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="px-3 py-1 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Active</div>
                                        <p className="text-white text-lg font-black tracking-tight">₹{crop.price} <span className="text-white/70 text-xs font-medium">/ unit</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{crop.crop_name}</h3>
                                    <div className="flex items-center gap-4 text-gray-500 font-bold text-xs uppercase tracking-wide">
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {crop.location}</span>
                                        <span className="flex items-center gap-1 text-blue-600"><ShoppingBag className="w-3.5 h-3.5" /> {crop.quantity} units</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Link to={`/crops/${crop.id}`} className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all font-bold text-sm">
                                        <Eye className="w-4 h-4" /> View
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(crop.id)}
                                        className="flex items-center justify-center gap-2 py-3 bg-white text-red-600 border border-red-100 rounded-2xl hover:bg-red-50 transition-all font-bold text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Your inventory is empty</h3>
                    <p className="text-gray-500 font-medium mt-1">Start by adding your first harvest to the marketplace.</p>
                    <Link to="/add-crop" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-95">
                        <PlusCircle className="w-5 h-5" />
                        List First Crop
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyCrops;
