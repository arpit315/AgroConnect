import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold border border-green-200">
              <Leaf className="w-4 h-4" />
              Empowering Agriculture
            </div>
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
              Connect Directly. <br />
              <span className="text-green-600">Grow Together.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              FarmConnect bridges the gap between farmers and vendors. List your crops or find requirements directly, eliminating middlemen and maximizing value for everyone.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/signup" className="px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all font-bold text-lg shadow-xl shadow-green-600/30 flex items-center gap-2 group active:scale-95">
                Join our Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/marketplace" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all font-bold text-lg hover:bg-gray-50 active:scale-95">
                Browse Marketplace
              </Link>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000">
            <div className="absolute -inset-4 bg-green-600/10 rounded-[3rem] blur-3xl -z-10"></div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200" 
                    alt="Lush green farm fields" 
                    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Verified Traders</h3>
            <p className="text-gray-600 leading-relaxed">Secure and authenticated platform for both farmers and vendors to ensure trust in every transaction.</p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-600/20">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Direct Connection</h3>
            <p className="text-gray-600 leading-relaxed">No middlemen involved. Talk directly to vendors for your crop or farmers for your requirements.</p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Community Driven</h3>
            <p className="text-gray-600 leading-relaxed">Building a sustainable ecosystem for agriculture where everyone can thrive together.</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600/10 mix-blend-overlay"></div>
        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
                <p className="text-5xl font-black text-green-500">10k+</p>
                <p className="text-gray-400 font-medium">Active Farmers</p>
            </div>
            <div className="space-y-2">
                <p className="text-5xl font-black text-green-500">5k+</p>
                <p className="text-gray-400 font-medium">B2B Vendors</p>
            </div>
            <div className="space-y-2">
                <p className="text-5xl font-black text-green-500">1M+</p>
                <p className="text-gray-400 font-medium">MT Crops Sold</p>
            </div>
            <div className="space-y-2">
                <p className="text-5xl font-black text-green-500">25+</p>
                <p className="text-gray-400 font-medium">Regions Covered</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
