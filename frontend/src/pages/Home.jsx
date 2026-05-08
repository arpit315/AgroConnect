import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, ArrowRight, ShieldCheck, Zap, Users, 
  TrendingUp, Globe, CheckCircle2, Star, 
  ChevronRight, PlayCircle
} from 'lucide-react';

import api from '../services/api';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [landingData, setLandingData] = useState({
    stats: { farmers: 0, vendors: 0, cities: 0 },
    recent_crops: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    fetchLandingData();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchLandingData = async () => {
    try {
      const res = await api.get('/public/landing-data');
      setLandingData(res.data);
    } catch (err) {
      console.error('Failed to fetch landing data', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 pb-24 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass text-primary-700 text-sm font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Leaf className="w-4 h-4" />
                The Future of Agri-Commerce
              </div>
              
              <div className="space-y-6">
                <h1 className="text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                  Connect <span className="text-gradient">Directly.</span><br />
                  Grow Together.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  FarmConnect is the premium bridge between local farmers and global buyers. We've removed the middlemen to ensure fair pricing and fresh produce for everyone.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Link to="/signup" className="btn-gradient px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 group active:scale-95 shadow-2xl shadow-primary-600/40">
                  Get Started
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/marketplace" className="px-8 py-4 glass text-gray-900 rounded-2xl font-black text-lg hover:bg-white transition-all active:scale-95 flex items-center gap-2">
                  Explore Marketplace
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 animate-in fade-in duration-1000 delay-500">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-2xl border-4 border-white bg-primary-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    {landingData.stats.farmers > 1000 ? `+${(landingData.stats.farmers / 1000).toFixed(1)}k` : `+${landingData.stats.farmers}`}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-black text-gray-900">Joined by {landingData.stats.farmers.toLocaleString()}+ Farmers</p>
                  <p className="text-gray-500 font-medium">Across {landingData.stats.cities} different regions</p>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="absolute -inset-10 bg-primary-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
              <div className="relative animate-float">
                <img 
                  src="/assets/hero.png" 
                  alt="FarmConnect Dashboard Mockup" 
                  className="rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-8 border-white/50 backdrop-blur-sm"
                />
                
                {/* Floating Micro-Cards */}
                <div className="absolute -top-10 -right-10 glass p-6 rounded-[2rem] shadow-2xl animate-float-delayed">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Market Price</p>
                        <p className="text-xl font-black text-gray-900">+12.5%</p>
                      </div>
                   </div>
                </div>

                <div className="absolute -bottom-10 -left-10 glass p-6 rounded-[2rem] shadow-2xl animate-float">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Top Rated</p>
                        <p className="text-xl font-black text-gray-900">Premium Grade</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50/50">
        <div className="container mx-auto px-6 text-center space-y-20">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-black text-gray-900 tracking-tight">Everything you need to <br /><span className="text-gradient">succeed in modern agriculture.</span></h2>
            <p className="text-lg text-gray-600">We provide the tools and platform to scale your agricultural business, whether you are growing or buying.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Direct Deals", desc: "No more middlemen. Farmers and buyers negotiate directly for the best value.", color: "green" },
              { icon: ShieldCheck, title: "Fair Pricing", desc: "Transparent market rates ensure everyone gets what they deserve.", color: "blue" },
              { icon: Zap, title: "Real-time Market", desc: "Instantly list crops and receive offers in seconds.", color: "yellow" },
              { icon: Globe, title: "Global Reach", desc: "Expand your market beyond local borders with secure logistics.", color: "purple" }
            ].map((feature, i) => (
              <div key={i} className="group p-8 glass rounded-[2.5rem] text-left hover:bg-white hover:-translate-y-2 transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="bg-gray-900 rounded-[4rem] p-16 lg:p-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-600/10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]"></div>
                
                <div className="relative z-10 grid md:grid-cols-3 gap-16 text-center">
                    <div className="space-y-4">
                        <p className="text-7xl font-black text-primary-400">{landingData.stats.farmers.toLocaleString()}+</p>
                        <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">Active Farmers</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-7xl font-black text-primary-400">{landingData.stats.vendors.toLocaleString()}+</p>
                        <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">Global Vendors</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-7xl font-black text-primary-400">{landingData.stats.cities}+</p>
                        <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">Cities Covered</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-32">
        <div className="container mx-auto px-6 space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
                <h2 className="text-5xl font-black text-gray-900 tracking-tight">Marketplace Preview</h2>
                <p className="text-lg text-gray-600 max-w-xl">Freshly listed crops from our top farmers. Quality guaranteed, prices transparent.</p>
            </div>
            <Link to="/marketplace" className="btn-gradient px-8 py-4 rounded-2xl font-black flex items-center gap-2">
                View All Listings <ChevronRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {landingData.recent_crops.length > 0 ? (
              landingData.recent_crops.map((crop, i) => (
                <div key={i} className="group glass rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 overflow-hidden relative">
                      <img src={crop.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600'} alt={crop.crop_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                          {crop.location}
                      </div>
                  </div>
                  <div className="p-8 space-y-4">
                      <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-black text-gray-900">{crop.crop_name}</h3>
                          <p className="text-primary-600 font-black">₹{crop.price.toLocaleString()}/unit</p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-700">
                              <Users className="w-5 h-5" />
                          </div>
                          <p className="text-sm font-bold text-gray-600">Farmer: {crop.farmer?.name || 'Anonymous'}</p>
                          <CheckCircle2 className="w-4 h-4 text-primary-500 ml-auto" />
                      </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center glass rounded-[3rem]">
                <p className="text-gray-500 font-bold">No crops listed yet. Be the first to list!</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
            <div className="relative rounded-[4rem] overflow-hidden bg-primary-600 p-16 lg:p-24 text-center text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-500"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 space-y-10">
                    <h2 className="text-6xl lg:text-7xl font-black tracking-tighter">Ready to join the future of agriculture?</h2>
                    <p className="text-xl text-primary-50 max-w-2xl mx-auto">Join thousands of farmers and buyers already growing together. Your next big deal is just a click away.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/signup" className="px-10 py-5 bg-white text-primary-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
                            Join Now
                        </Link>
                        <Link to="/contact" className="px-10 py-5 bg-primary-700 text-white rounded-2xl font-black text-xl hover:bg-primary-800 transition-all border border-primary-500/50">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

