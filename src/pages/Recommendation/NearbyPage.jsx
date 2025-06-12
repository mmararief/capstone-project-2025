// src/pages/NearbyPage.jsx

import React, { useState, useEffect } from "react";
import useGeolocation from "@/hooks/useGeolocation";
import { MapPin, RefreshCw, Loader, Navigation } from "lucide-react";
import RecommendationCarousel from "@/components/RecommendationCarousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different marker types
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzEyOTNkMSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const attractionIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTUuMzEgMiAxOCA0LjY5IDE4IDhDMTggMTMuNSAxMiAyMiAxMiAyMkMxMiAyMiA2IDEzLjUgNiA4QzYgNC42OSA4LjY5IDIgMTIgMloiIGZpbGw9IiNkYzI2MjYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iMiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Component to center map when location changes
const MapController = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  
  return null;
};

// Enhanced MapDisplay component using Leaflet with real multiple markers
const MapDisplay = ({ lat, lon }) => {
  const navigate = useNavigate();
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat && lon) {
      fetchNearbyPlaces();
    }
  }, [lat, lon]);

  const fetchNearbyPlaces = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/recommend/nearby?lat=${lat}&lon=${lon}&top_n=8`
      );
      setNearbyPlaces(response.data);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      setNearbyPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceClick = (place) => {
    navigate(`/places/${place.id}`);
  };

  if (!lat || !lon) return null;

  const mapCenter = [lat, lon];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#1A3636] flex items-center gap-2">
          <MapPin size={24} />
          Interactive Map - Your Location & Nearby Places
        </h2>
      </div>
      
      <div className="relative">
        <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner mb-4 relative">
          {loading && (
            <div className="absolute top-0 left-0 right-0 bg-blue-50 px-4 py-2 rounded-t-xl z-10">
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Loader className="animate-spin h-4 w-4" />
                Loading nearby attraction points...
              </div>
            </div>
          )}
          
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
            className="rounded-xl"
          >
            <MapController center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* User location marker */}
            <Marker position={[lat, lon]} icon={userIcon}>
              <Popup>
                <div className="text-center p-2">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 mb-1">
                    <Navigation size={16} />
                    Your Current Location
                  </div>
                  <p className="text-sm text-gray-600">
                    Lat: {lat.toFixed(4)}, Lon: {lon.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
            
            {/* Nearby attractions markers */}
            {!loading && nearbyPlaces.map((place) => {
              // Gunakan langsung koordinat dari data API
              if (typeof place.latitude !== 'number' || typeof place.longitude !== 'number') return null;
              return (
                <Marker 
                  key={place.id} 
                  position={[place.latitude, place.longitude]} 
                  icon={attractionIcon}
                  eventHandlers={{
                    click: () => handlePlaceClick(place)
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px] p-2">
                      <h3 className="font-semibold text-[#1A3636] mb-1">{place.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{place.category}</p>
                      {place.avgRating && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm text-gray-700">{place.avgRating.toFixed(1)}</span>
                        </div>
                      )}
                      {place.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{place.description}</p>
                      )}
                      <button
                        onClick={() => handlePlaceClick(place)}
                        className="w-full bg-[#1A3636] text-white text-sm py-1 px-2 rounded hover:bg-[#2A4A4A] transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Map Legend */}
      <div className="p-3 bg-gray-50 rounded-lg mb-4">
        <p className="text-xs text-gray-600 mb-2 font-medium">Map Legend:</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
            <span className="text-gray-700">Your Current Location</span>
          </div>
          {nearbyPlaces.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-700">Nearby Attractions ({nearbyPlaces.length} found)</span>
            </div>
          )}
        </div>
        {nearbyPlaces.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            💡 Click on any red markers to see details and navigate to place information. Zoom and pan to explore the area.
          </p>
        )}
      </div>


      
      <div className="p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <strong>Your Coordinates:</strong> {lat.toFixed(4)}, {lon.toFixed(4)}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Interactive map with {nearbyPlaces.length} nearby attractions within 5km radius
            </p>
          </div>
          {nearbyPlaces.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1A3636]">{nearbyPlaces.length}</div>
              <div className="text-xs text-gray-600">Places Found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function NearbyPage() {
  const {
    location,
    error: locationError,
    loading: locationLoading,
    refetch,
  } = useGeolocation();

  // Handler untuk tombol refresh
  const handleRefresh = () => {
    refetch();
  };

  // Tampilan utama
  const renderContent = () => {
    // State 1: Sedang memuat lokasi awal
    if (locationLoading) {
      return (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-4 text-gray-500">
          <Loader className="animate-spin h-12 w-12" />
          <h2 className="text-2xl font-semibold">Finding your location...</h2>
          <p>Please allow location access in your browser.</p>
        </div>
      );
    }

    // State 2: Gagal mendapatkan lokasi
    if (locationError) {
      return (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-4 text-red-500">
          <MapPin className="h-12 w-12" />
          <h2 className="text-2xl font-semibold">Location Not Found</h2>
          <p className="max-w-md">{locationError}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <RefreshCw size={18} /> Try Again
          </button>
        </div>
      );
    }

    // State 3: Berhasil mendapatkan lokasi
    if (location) {
      return (
        <>
          {/* Show interactive map with user location + nearby places */}
          <MapDisplay lat={location.lat} lon={location.lon} />
          
          {/* Show nearby attractions carousel from API */}
          <RecommendationCarousel
            title="Places Near You"
            endpoint={`/recommend/nearby?lat=${location.lat}&lon=${location.lon}&top_n=8`}
          />
        </>
      );
    }

    return null; // Fallback jika tidak ada state yang cocok
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#1A3636] flex items-center justify-center gap-3">
          <MapPin className="text-[#1A3636]" /> Interactive Nearby Map
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore amazing attractions near your location with our interactive map featuring multiple markers and detailed popups
        </p>
        <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2">
            <MapPin size={16} /> USING YOUR LOCATION
          </span>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 flex items-center gap-2 shadow-sm"
          >
            <RefreshCw size={16} /> Refresh Location
          </button>
        </div>
      </div>

      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}