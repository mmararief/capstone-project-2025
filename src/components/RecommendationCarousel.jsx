// src/components/RecommendationCarousel.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "./PlaceCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ikon opsional

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function RecommendationCarousel({ title, endpoint }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}${endpoint}`);
        setPlaces(res.data);
      } catch (err) {
        console.error(`Gagal fetch untuk ${title}:`, err);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [endpoint, title]);

  if (loading) {
    // Tampilan skeleton saat loading
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#1A3636] mb-4">{title}</h2>
        <div className="flex gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-64 h-64 bg-gray-700/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (places.length === 0) {
    return null; // Jangan tampilkan rak jika tidak ada data
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#1A3636] mb-4">{title}</h2>
      <div className="relative">
        {/* Tombol navigasi (opsional, untuk estetika) */}
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-white/50"><ChevronLeft size={40} /></div>
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-white/50"><ChevronRight size={40} /></div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {places.map((place) => (
            <PlaceCard key={`${title}-${place.id}`} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}