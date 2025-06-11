import React, { useState, useEffect } from "react";
import { MapPin, ExternalLink, Navigation, Loader } from "lucide-react";

const MapDisplay = ({ place }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to geocode place name to coordinates
  const geocodePlace = async (placeName) => {
    try {
      setLoading(true);
      setError(null);

      // Jika nama tempat kosong atau terlalu pendek, langsung fallback ke Jakarta
      if (!placeName || placeName.length < 3) {
        setError('Nama tempat tidak valid, menampilkan peta Jakarta.');
        setCoordinates({ lat: -6.2088, lon: 106.8456 });
        return;
      }

      // Using Nominatim API (OpenStreetMap) for geocoding
      const searchQuery = `${placeName}, Jakarta, Indonesia`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coords = { lat: parseFloat(lat), lon: parseFloat(lon) };
        setCoordinates(coords);
      } else {
        // Tidak perlu log error di console, cukup fallback
        setError('Lokasi tidak ditemukan, menampilkan peta Jakarta.');
        setCoordinates({ lat: -6.2088, lon: 106.8456 });
      }
    } catch (err) {
      // Tidak perlu log error di console kecuali di development
      if (process.env.NODE_ENV === 'development') {
        console.error('Geocoding error:', err);
      }
      setError('Gagal mencari lokasi, menampilkan peta Jakarta.');
      setCoordinates({ lat: -6.2088, lon: 106.8456 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (place?.name) {
      geocodePlace(place.name);
    }
  }, [place?.name]);

  const openInGoogleMaps = () => {
    if (coordinates) {
      const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}`;
      window.open(googleMapsUrl, '_blank');
    } else {
      const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(place.name + " Jakarta")}`;
      window.open(searchUrl, '_blank');
    }
  };

  const openInWaze = () => {
    if (coordinates) {
      const wazeUrl = `https://waze.com/ul?ll=${coordinates.lat}%2C${coordinates.lon}&navigate=yes`;
      window.open(wazeUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-[#1A3636] mb-6 flex items-center gap-2">
          <MapPin size={24} />
          Location
        </h3>
        <div className="flex items-center justify-center h-80 bg-gray-100 rounded-xl">
          <div className="text-center">
            <Loader className="animate-spin h-8 w-8 text-[#1A3636] mx-auto mb-2" />
            <p className="text-gray-600">Loading location...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !coordinates) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-[#1A3636] mb-6 flex items-center gap-2">
          <MapPin size={24} />
          Location
        </h3>
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Unable to load map for this location</p>
          <button
            onClick={openInGoogleMaps}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A3636] text-white rounded-lg hover:bg-[#40534C] transition-colors"
          >
            <ExternalLink size={16} />
            Search on Google Maps
          </button>
        </div>
      </div>
    );
  }

  // Generate OpenStreetMap embed URL for single location
  const mapUrl = coordinates 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${
        coordinates.lon - 0.005
      },${coordinates.lat - 0.005},${coordinates.lon + 0.005},${
        coordinates.lat + 0.005
      }&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#1A3636] flex items-center gap-2">
          <MapPin size={24} />
          Location
        </h3>
      </div>

      {/* Map Container */}
      {mapUrl && (
        <div className="mb-6">
          <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={mapUrl}
              title={`Map of ${place.name}`}
              aria-label={`Interactive map showing location of ${place.name}`}
              className="w-full h-full"
            />
          </div>
          {error && (
            <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
              <span>⚠️</span>
              Location is approximate - {error}
            </p>
          )}
          
          {/* Map Legend */}
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2 font-medium">Map Legend:</p>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">{place.name} Location</span>
            </div>
          </div>
        </div>
      )}

      {/* Current Location Info */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-[#1A3636] mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">{place.name}</h4>
            <p className="text-gray-600">{place.category} • Jakarta, Indonesia</p>
            {coordinates && (
              <p className="text-xs text-gray-500 mt-1">
                Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={openInGoogleMaps}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1A3636] text-white rounded-lg hover:bg-[#40534C] transition-colors font-medium"
        >
          <ExternalLink size={16} />
          Open in Google Maps
        </button>
        
        {coordinates && (
          <button
            onClick={openInWaze}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#1A3636] text-[#1A3636] rounded-lg hover:bg-[#1A3636] hover:text-white transition-colors font-medium"
          >
            <Navigation size={16} />
            Navigate with Waze
          </button>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-xs">💡</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Navigation Tips</p>
            <ul className="text-blue-700 space-y-1">
              <li>• Use public transportation for eco-friendly travel</li>
              <li>• Check opening hours before visiting</li>
              <li>• Allow extra time for parking in busy areas</li>
              <li>• Consider traffic conditions during peak hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;