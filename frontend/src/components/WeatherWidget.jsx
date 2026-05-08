import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Cloud, Loader, Droplets } from 'lucide-react';
import api from '../services/api';

const WeatherWidget = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Default coordinates for India (Center)
                let lat = 20.5937;
                let lon = 78.9629;
                
                const loc = location?.toLowerCase() || '';
                
                // Simple mapping for common Indian locations/keywords
                if (loc.includes('delhi')) { lat = 28.6139; lon = 77.2090; }
                else if (loc.includes('mumbai')) { lat = 19.0760; lon = 72.8777; }
                else if (loc.includes('punjab') || loc.includes('ludhiana')) { lat = 30.9010; lon = 75.8573; }
                else if (loc.includes('bangalore') || loc.includes('bengaluru')) { lat = 12.9716; lon = 77.5946; }
                else if (loc.includes('chennai')) { lat = 13.0827; lon = 80.2707; }
                else if (loc.includes('kolkata')) { lat = 22.5726; lon = 88.3639; }
                else if (loc.includes('pune')) { lat = 18.5204; lon = 73.8567; }
                else if (loc.includes('hyderabad')) { lat = 17.3850; lon = 78.4867; }
                else if (loc.includes('jaipur')) { lat = 26.9124; lon = 75.7873; }
                else if (loc.includes('ahmedabad')) { lat = 23.0225; lon = 72.5714; }
                else if (loc.includes('up') || loc.includes('lucknow')) { lat = 26.8467; lon = 80.9462; }
                else if (loc.includes('bihar') || loc.includes('patna')) { lat = 25.5941; lon = 85.1376; }
                
                const res = await api.post('/smart/weather', { lat, lon });
                setWeather(res.data.current_weather);
            } catch (err) {
                console.error("Failed to fetch weather", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    if (loading) return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2.5rem] p-8 text-white flex items-center justify-center min-h-[200px] shadow-xl shadow-blue-600/30">
            <Loader className="w-8 h-8 animate-spin text-white/70" />
        </div>
    );

    if (!weather) return null;

    // Simple weather icon logic based on WMO code (0 = clear, 1-3 = partly cloudy, >3 = rain/snow)
    const getWeatherIcon = (code) => {
        if (code === 0) return <Sun className="w-12 h-12 text-yellow-300" />;
        if (code > 0 && code <= 3) return <Cloud className="w-12 h-12 text-gray-200" />;
        if (code > 3) return <CloudRain className="w-12 h-12 text-blue-200" />;
        return <Sun className="w-12 h-12 text-yellow-300" />;
    };

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h3 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-1">Local Weather</h3>
                    <p className="text-2xl font-black">{location || 'Your Farm'}</p>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <Wind className="w-4 h-4 text-white/70" />
                            <span className="font-bold text-sm">{weather.windspeed} km/h</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-white/70" />
                            <span className="font-bold text-sm">Humidity</span>
                        </div>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end">
                    {getWeatherIcon(weather.weathercode)}
                    <span className="text-5xl font-black mt-2">{Math.round(weather.temperature)}°</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
