import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Tag, ArrowLeft, Phone, Mail, ShoppingCart, User, Calendar, Info, Loader } from 'lucide-react';

const CropDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState('');
    const [orderLoading, setOrderLoading] = useState(false);
    const [pricePrediction, setPricePrediction] = useState(null);

    useEffect(() => {
        fetchCrop();
    }, [id]);

    const fetchCrop = async () => {
        try {
            const res = await api.get(`/crops/${id}`);
            setCrop(res.data);
            
            // Fetch price prediction based on crop name
            try {
                const predRes = await api.post('/smart/predict-price', { crop_name: res.data.crop_name });
                setPricePrediction(predRes.data);
            } catch (err) {
                console.error("Prediction failed");
            }
        } catch (err) {
            console.error('Failed to fetch crop details', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        setOrderLoading(true);
        try {
            await api.post('/orders', {
                crop_id: id,
                quantity: orderQty
            });
            alert('Order placed successfully!');
            setOrderQty('');
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        } finally {
            setOrderLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-500 font-bold">Details appearing shortly...</p>
        </div>
    );
    if (!crop) return <div className="text-center py-20 text-red-500 font-bold">Crop not found or error loading data.</div>;

    return (
        <div className="max-w-6xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-all group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Marketplace
            </button>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="space-y-4 animate-in fade-in slide-in-from-left duration-700">
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                        <img 
                            src={crop.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200'}
                            alt={crop.crop_name}
                            className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="px-5 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-black tracking-widest uppercase border border-green-200">
                                Fresh Harvest
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 font-bold text-sm">
                                <Calendar className="w-4 h-4" />
                                {new Date(crop.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none uppercase">{crop.crop_name}</h1>
                        <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                             <Tag className="w-6 h-6" />
                             ₹{crop.price} <span className="text-gray-400 text-lg font-medium">/ unit</span>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Qty</p>
                                <p className="text-xl font-black text-gray-900">{crop.quantity} units</p>
                            </div>
                        </div>
                        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                                <p className="text-xl font-black text-gray-900">{crop.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Info className="w-6 h-6 text-green-600" />
                            Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-medium bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200">
                            {crop.description || "No detailed description provided for this listing. Contact the farmer for more information about quality, harvesting time, and transportation options."}
                        </p>
                    </div>

                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl shadow-gray-900/40">
                        <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
                            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                {crop.farmer?.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Farmer</p>
                                <p className="text-xl font-bold">{crop.farmer?.name}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-2">
                             <a href={`tel:${crop.farmer?.phone}`} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition-all font-bold group">
                                <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                                {crop.farmer?.phone || 'Call Farmer'}
                             </a>
                             <a href={`mailto:${crop.farmer?.email}`} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition-all font-bold group">
                                <Mail className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                                Email Farmer
                             </a>
                        </div>
                    </div>

                    {/* Order & Smart Features Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <div className="bg-green-50 p-6 rounded-3xl border border-green-100 space-y-4">
                            <h3 className="text-xl font-bold text-green-900">Place an Order</h3>
                            <div className="flex gap-4">
                                <input 
                                    type="number" 
                                    min="1" 
                                    max={crop.quantity}
                                    value={orderQty}
                                    onChange={(e) => setOrderQty(e.target.value)}
                                    placeholder="Quantity"
                                    className="w-1/3 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-600 outline-none font-bold"
                                />
                                <button 
                                    onClick={handlePlaceOrder}
                                    disabled={orderLoading || !orderQty}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                                >
                                    {orderLoading ? 'Placing Order...' : `Buy for ₹${(orderQty * crop.price) || 0}`}
                                </button>
                            </div>
                        </div>

                        {pricePrediction && (
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">Price Prediction Trend</h3>
                                <p className="text-sm text-gray-500">Based on historical market data for {crop.crop_name}</p>
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {pricePrediction.trend.map((t, idx) => (
                                        <div key={idx} className="flex-shrink-0 bg-gray-50 p-3 rounded-xl text-center min-w-[80px]">
                                            <p className="text-xs text-gray-400 font-bold uppercase">{t.day}</p>
                                            <p className="text-lg font-black text-gray-900">₹{t.predicted_price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetails;
