import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search, MapPin, Tag, Filter, Grid, List as ListIcon, ShoppingBag, Loader } from 'lucide-react';

const Marketplace = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        fetchCrops();
    }, []);

    const fetchCrops = async () => {
        setLoading(true);
        try {
            const res = await api.get('/crops');
            setCrops(res.data);
        } catch (err) {
            console.error('Failed to fetch crops', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredCrops = crops.filter(crop => {
        const matchesSearch = crop.crop_name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesLocation = crop.location.toLowerCase().includes(filters.location.toLowerCase());
        const price = parseFloat(crop.price);
        const matchesMinPrice = filters.minPrice === '' || price >= parseFloat(filters.minPrice);
        const matchesMaxPrice = filters.maxPrice === '' || price <= parseFloat(filters.maxPrice);
        return matchesSearch && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    return (
        <div className="space-y-12 py-6 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Marketplace</h1>
                    <p className="text-gray-500 font-medium text-lg mt-2">Discover fresh harvests directly from farmers</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <Grid className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-100 opacity-50">
                        <ListIcon className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </header>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search crops..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-100 focus:bg-white border-transparent focus:border-green-600 border transition-all font-medium"
                        value={filters.search}
                        onChange={e => setFilters({...filters, search: e.target.value})}
                    />
                </div>
                <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Location..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-100 focus:bg-white border-transparent focus:border-green-600 border transition-all font-medium"
                        value={filters.location}
                        onChange={e => setFilters({...filters, location: e.target.value})}
                    />
                </div>
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        placeholder="Min Price"
                        className="w-1/2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-100 focus:bg-white border-transparent focus:border-green-600 border transition-all font-medium"
                        value={filters.minPrice}
                        onChange={e => setFilters({...filters, minPrice: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Max Price"
                        className="w-1/2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-100 focus:bg-white border-transparent focus:border-green-600 border transition-all font-medium"
                        value={filters.maxPrice}
                        onChange={e => setFilters({...filters, maxPrice: e.target.value})}
                    />
                </div>
                <button className="bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98]">
                    <Filter className="w-5 h-5" />
                    Apply Filters
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader className="w-12 h-12 text-green-600 animate-spin" />
                    <p className="text-gray-500 font-bold">Bringing you the latest harvests...</p>
                </div>
            ) : filteredCrops.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCrops.map(crop => (
                        <Link 
                            key={crop.id} 
                            to={`/crops/${crop.id}`}
                            className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={crop.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'} 
                                    alt={crop.crop_name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-green-700 font-black text-sm">
                                    ${crop.price}/unit
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors uppercase tracking-tight">{crop.crop_name}</h3>
                                    <div className="flex items-center gap-1.5 text-gray-500 font-medium text-sm">
                                        <MapPin className="w-4 h-4" />
                                        {crop.location}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs ring-2 ring-white">
                                            {crop.farmer?.name?.charAt(0) || 'F'}
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">{crop.farmer?.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-400 group-hover:text-green-600 transition-colors flex items-center gap-1">
                                        DETAILS <Tag className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 animate-in fade-in slide-in-from-top-4">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">No crops found</h3>
                    <p className="text-gray-500 mt-2 font-medium">Try adjusting your filters or check back later.</p>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
