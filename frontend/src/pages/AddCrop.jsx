import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PlusCircle, Tag, ShoppingBag, MapPin, AlignLeft, Image as ImageIcon, ArrowLeft, Loader, CheckCircle } from 'lucide-react';

const AddCrop = () => {
    const [cropData, setCropData] = useState({
        crop_name: '',
        quantity: '',
        price: '',
        location: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/crops', cropData);
            setSuccess(true);
            setTimeout(() => navigate('/my-crops'), 2000);
        } catch (err) {
            console.error('Failed to add crop', err);
            alert('Failed to list crop. Please check your data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold transition-all group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="lg:w-1/3 space-y-6">
                    <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-green-600/30">
                        <PlusCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">List New <br /><span className="text-green-600">Harvest</span></h1>
                        <p className="text-gray-500 font-medium mt-4">Provide accurate details about your crop to reach the right vendors faster.</p>
                    </div>
                </div>

                <div className="lg:w-2/3 w-full bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 relative overflow-hidden">
                    {success && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-600/30">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900">Listed Successfully!</h2>
                            <p className="text-gray-500 font-bold tracking-tight">Redirecting you to your inventory...</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Crop Name</label>
                                <div className="relative group">
                                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Organic Wheat"
                                        value={cropData.crop_name}
                                        onChange={(e) => setCropData({ ...cropData, crop_name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Quantity (Units)</label>
                                    <div className="relative group">
                                        <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                        <input
                                            type="number"
                                            required
                                            placeholder="e.g. 500"
                                            value={cropData.quantity}
                                            onChange={(e) => setCropData({ ...cropData, quantity: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Price per Unit (₹)</label>
                                    <div className="relative group">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                        <input
                                            type="number"
                                            required
                                            placeholder="e.g. 25"
                                            value={cropData.price}
                                            onChange={(e) => setCropData({ ...cropData, price: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Harvest Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Springfield Farm, KS"
                                        value={cropData.location}
                                        onChange={(e) => setCropData({ ...cropData, location: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Image URL (Optional)</label>
                                <div className="relative group">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                    <input
                                        type="url"
                                        placeholder="https://example.com/crop.jpg"
                                        value={cropData.image}
                                        onChange={(e) => setCropData({ ...cropData, image: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Detailed Description</label>
                                <div className="relative group">
                                    <AlignLeft className="absolute left-4 top-6 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                    <textarea
                                        rows="4"
                                        placeholder="Describe your crop's quality, variety, and any other relevant details..."
                                        value={cropData.description}
                                        onChange={(e) => setCropData({ ...cropData, description: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900 resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-green-600 text-white rounded-[1.5rem] hover:bg-green-700 transition-all font-black text-xl shadow-2xl shadow-green-600/30 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader className="w-6 h-6 animate-spin" /> : <PlusCircle className="w-6 h-6" />}
                            {loading ? 'Processing...' : 'List Harvest Now'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCrop;
