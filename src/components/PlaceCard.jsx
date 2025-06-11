// src/components/PlaceCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, DollarSign } from "lucide-react";

export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  // Fungsi untuk navigasi saat kartu diklik
  const handleNavigate = () => {
    navigate(`/places/${place.id}`);
    // Scroll ke atas halaman saat pindah halaman
    window.scrollTo(0, 0);
  };

  const priceText =
    typeof place.price === "number" && place.price > 0
      ? `Rp ${place.price.toLocaleString("id-ID")}`
      : "Free";

  const isPaid = typeof place.price === "number" && place.price > 0;

  return (
    <div
      onClick={handleNavigate}
      className="group flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
    >
      {/* Image Container dengan Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={place.image_url || "/placeholder.svg"}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1A3636] text-xs font-semibold rounded-full">
            <MapPin size={12} className="mr-1" />
            {place.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 backdrop-blur-sm text-xs font-semibold rounded-full ${
            isPaid 
              ? 'bg-green-500/90 text-white' 
              : 'bg-blue-500/90 text-white'
          }`}>
            <DollarSign size={12} className="mr-1" />
            {priceText}
          </span>
        </div>

        {/* Rating Overlay (muncul saat hover) */}
        {place.avgRating && (
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400/90 backdrop-blur-sm rounded-full">
              <Star size={12} className="text-yellow-800 fill-yellow-800" />
              <span className="text-yellow-800 text-xs font-semibold">
                {place.avgRating.toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#1A3636] mb-2 group-hover:text-[#40534C] transition-colors duration-300" title={place.name}>
          {place.name}
        </h3>
        
        {/* Description Preview */}
        {place.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {place.description}
          </p>
        )}

        {/* Footer dengan Additional Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {place.avgRating ? (
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {place.avgRating.toFixed(1)}
                </span>
                {place.totalRatings && (
                  <span className="text-xs text-gray-500">
                    ({place.totalRatings})
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-gray-400 italic">No ratings yet</span>
            )}
          </div>

          {/* Call to Action */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[#1A3636] text-sm font-semibold">
              View Details →
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-[#1A3636]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}