import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ClipboardList, ShoppingBag, PlusCircle, MapPin, Tag, AlignLeft, ArrowLeft, Loader, CheckCircle } from 'lucide-react';

const PostRequirement = () => {
    const [reqData, setReqData] = useState({
        crop_name: '',
        quantity: '',
        budget: '',
        location: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/requirements', reqData);
            setSuccess(true);
            setTimeout(() => navigate('/vendor'), 2000);
        } catch (err) {
            console.error('Failed to post requirement', err);
            alert('Error posting requirement. Please check your data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in duration-700">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-all group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="lg:w-1/3 space-y-6">
                    <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                        <ClipboardList className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">Post Market <br /><span className="text-blue-600">Requirement</span></h1>
                        <p className="text-gray-500 font-medium mt-4 text-lg">Let farmers know what you're looking for. Reach out to thousands of cultivators instantly.</p>
                    </div>
                </div>

                <div className="lg:w-2/3 w-full bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 relative overflow-hidden">
                    {success && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase">Blast Sent!</h2>
                            <p className="text-gray-500 font-bold tracking-tight">Your request is now live for farmers.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Required Crop</label>
                                <div className="relative group">
                                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Basmati Rice"
                                        value={reqData.crop_name}
                                        onChange={(e) => setReqData({ ...reqData, crop_name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Quantity Needed</label>
                                    <div className="relative group">
                                        <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="number"
                                            required
                                            placeholder="e.g. 1000"
                                            value={reqData.quantity}
                                            onChange={(e) => setReqData({ ...reqData, quantity: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Total Budget (₹)</label>
                                    <div className="relative group">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="number"
                                            required
                                            placeholder="e.g. 5000"
                                            value={reqData.budget}
                                            onChange={(e) => setReqData({ ...reqData, budget: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Delivery Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Warehouse A, Chicago IL"
                                        value={reqData.location}
                                        onChange={(e) => setReqData({ ...reqData, location: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest">Notes for Farmers</label>
                                <div className="relative group">
                                    <AlignLeft className="absolute left-4 top-6 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <textarea
                                        rows="4"
                                        placeholder="Specific quality standards, packaging, or delivery timelines..."
                                        value={reqData.description}
                                        onChange={(e) => setReqData({ ...reqData, description: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-gray-900 resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition-all font-black text-xl shadow-2xl shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader className="w-6 h-6 animate-spin" /> : <PlusCircle className="w-6 h-6" />}
                            {loading ? 'Posting...' : 'Send Marketplace Broadcast'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostRequirement;
