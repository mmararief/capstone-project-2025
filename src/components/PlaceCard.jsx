// src/components/PlaceCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

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
      : "Gratis";

  return (
    <div
      onClick={handleNavigate}
      className="flex-shrink-0 w-64 bg-[#1A3636] border-2 border-[#D6BD98] rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
    >
      <img
        src={place.image_url || "/placeholder.svg"}
        alt={place.name}
        className="w-full h-36 object-cover"
        loading="lazy"
      />
      <div className="p-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#D6BD98] mb-1">
          {place.category}
        </p>
        <h3 className="text-lg font-bold truncate" title={place.name}>
          {place.name}
        </h3>
        <p className="text-md font-semibold text-[#D6BD98] mt-2">{priceText}</p>
      </div>
    </div>
  );
}