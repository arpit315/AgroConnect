import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapLocator = ({ crops }) => {
    // Default center (India)
    const center = [20.5937, 78.9629];

    // Mock geocoding logic based on location string. In a real app we would have lat/lon in the crop table
    // For demo purposes, we will scatter markers slightly around the center if there are crops
    
    return (
        <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl relative z-0">
            <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {crops && crops.map((crop, index) => {
                    // Generate pseudo-random nearby coordinates based on ID for demo
                    // Adjusted for India's spread
                    const lat = center[0] + (Math.sin(crop.id || index) * 6);
                    const lon = center[1] + (Math.cos(crop.id || index) * 8);
                    
                    return (
                        <Marker key={crop.id || index} position={[lat, lon]}>
                            <Popup>
                                <div className="font-bold">
                                    <p className="text-green-600 text-lg uppercase tracking-tight">{crop.crop_name}</p>
                                    <p className="text-gray-900">₹{crop.price}/unit</p>
                                    <p className="text-gray-500 text-xs mt-1">{crop.location}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
            
            <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-900 text-sm">Live Crop Map</span>
            </div>
        </div>
    );
};

export default MapLocator;
