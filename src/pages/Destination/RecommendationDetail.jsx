// src/components/RecommendationDetail.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "./PlaceCard"; // Pastikan path import benar

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function RecommendationDetail({ placeId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placeId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/recommend/by_place?place_id=${placeId}&top_n=5`
        );
        setRecommendations(res.data);
      } catch (err) {
        console.error("Gagal mengambil data rekomendasi:", err);
        // Tidak menampilkan error di UI agar tidak mengganggu
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [placeId]); // Akan fetch ulang jika placeId berubah

  // Jangan tampilkan apapun jika sedang loading atau tidak ada rekomendasi
  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-[#D6BD98] mb-6">
        Rekomendasi Tempat Serupa 🏞️
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6">
        {recommendations.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}