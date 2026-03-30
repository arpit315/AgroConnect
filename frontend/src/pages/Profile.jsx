import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, MapPin, Save, CheckCircle, AlertCircle } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        location: user?.location || ''
    });
    const [status, setStatus] = useState({ type: null, message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: null, message: '' });
        try {
            await updateProfile(profileData);
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-black text-gray-900 mb-8">Personal Profile</h1>
            
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="bg-green-600 h-32 relative">
                    <div className="absolute -bottom-12 left-10 p-2 bg-white rounded-[2rem] shadow-lg">
                        <div className="w-24 h-24 bg-gray-100 rounded-[1.5rem] flex items-center justify-center text-green-600">
                            <User className="w-12 h-12" />
                        </div>
                    </div>
                </div>

                <div className="pt-16 px-10 pb-10 space-y-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs mt-1">{user.role}</p>
                        </div>
                        <div className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold border border-green-200">
                            Verified Account
                        </div>
                    </div>

                    {status.message && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 ${
                            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                            <span className="text-sm font-bold">{status.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                    <input
                                        type="tel"
                                        placeholder="e.g. +1 234 567 890"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="e.g. California, USA"
                                        value={profileData.location}
                                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all font-bold text-lg shadow-xl shadow-gray-900/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {isSaving ? 'Saving Changes...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
