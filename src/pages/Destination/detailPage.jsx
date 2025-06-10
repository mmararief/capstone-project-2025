// src/pages/DetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceCard from "@/components/PlaceCard"; // Pastikan path import benar

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Komponen untuk menampilkan bagian rekomendasi
const RecommendationsSection = ({ placeId }) => {
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
        setRecommendations([]); // Kosongkan jika error
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [placeId]);

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-400 mt-8">
        Memuat rekomendasi...
      </p>
    );
  }

  if (recommendations.length === 0) {
    return null; // Jangan tampilkan apa-apa jika tidak ada rekomendasi
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
};

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = localStorage.getItem("authToken");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlace = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_BASE_URL}/places/${id}`, {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        });
        setPlace(res.data);
        if (res.data.userRating) {
          setUserRating(res.data.userRating);
        } else {
          setUserRating(0);
        }
      } catch (err) {
        console.error("Error fetch place:", err.response || err.message || err);
        setError("Data tidak ditemukan atau terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id, accessToken]);

  const handleRating = async (value) => {
    if (!accessToken) {
      alert("Anda harus login untuk memberi rating.");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/places/${id}/rate`,
        { value },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setUserRating(value);
      const updatedPlace = await axios.get(`${API_BASE_URL}/places/${id}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      });
      setPlace(updatedPlace.data);
    } catch (err) {
      console.error(
        "Gagal mengirim rating:",
        err.response || err.message || err
      );
      if (err.response && err.response.status === 401) {
        alert(
          "Sesi Anda telah berakhir. Silakan login kembali untuk memberi rating."
        );
      } else {
        alert("Gagal mengirim rating. Terjadi kesalahan pada server.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (
    ratingValue,
    interactive = false,
    onStarClick = () => {}
  ) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => interactive && !isSubmitting && onStarClick(star)}
        onMouseEnter={() => interactive && setHoverRating(star)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        className={`text-3xl transition-colors ${
          interactive ? "cursor-pointer" : "cursor-default"
        } ${
          (interactive ? hoverRating || ratingValue : ratingValue) >= star
            ? "text-yellow-400"
            : "text-gray-400"
        } ${
          interactive && isSubmitting ? "pointer-events-none opacity-50" : ""
        }`}
        aria-label={`${star} star`}
        role={interactive ? "button" : "img"}
        tabIndex={interactive ? 0 : -1}
        onKeyDown={(e) => {
          if (interactive && (e.key === "Enter" || e.key === " ")) {
            onStarClick(star);
          }
        }}
      >
        ★
      </span>
    ));
  };

  if (loading) return <p className="text-center py-40 text-2xl">Loading...</p>;
  if (error)
    return <p className="text-center py-40 text-2xl text-red-500">{error}</p>;
  if (!place) return null;

  const roundedAvgRating = place.avgRating
    ? Math.round(place.avgRating * 2) / 2
    : 0;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-[#1A3636] border-4 border-[#D6BD98] rounded-3xl shadow-xl overflow-hidden">
        <img
          src={place.image_url || "/placeholder.svg"}
          alt={place.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-8 bg-[#1A3636] text-[#E6FFFA]">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#D6BD98] mb-2">
            {place.category}
          </p>
          <h1 className="text-4xl font-bold text-[#D6BD98] mb-4 text-center">
            {place.name}
          </h1>
          <p className="text-lg mb-6 text-center">{place.description}</p>
          <div className="text-center text-xl font-semibold text-[#D6BD98] mb-6">
            {typeof place.price === "number" && place.price > 0
              ? `Harga Tiket: Rp ${place.price.toLocaleString("id-ID")}`
              : "Gratis"}
          </div>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-[#E6FFFA] mb-2">
              Rating Rata-Rata
            </h3>
            <div className="flex justify-center items-center gap-2">
              <div
                className="flex"
                aria-label={`Rating rata-rata: ${place.avgRating?.toFixed(
                  1
                )} dari 5`}
              >
                {renderStars(roundedAvgRating, false)}
              </div>
              <span className="font-bold text-xl text-yellow-400">
                {place.avgRating?.toFixed(1) || "N/A"}
              </span>
              <span className="text-sm text-gray-300">/ 5</span>
            </div>
          </div>
          <div className="mt-6 text-center border-t-2 border-[#D6BD98]/20 pt-6">
            <h3 className="text-lg font-semibold text-[#E6FFFA] mb-2">
              Beri Rating Anda:
            </h3>
            {accessToken ? (
              <div
                className="flex justify-center gap-1"
                aria-label="Beri rating Anda"
              >
                {renderStars(userRating, true, handleRating)}
              </div>
            ) : (
              <p className="text-sm text-[#D6BD98]">
                <a href="/login" className="underline hover:text-white">
                  Login
                </a>
                untuk memberi rating ⭐
              </p>
            )}
          </div>
          
          {/* --- TOMBOL KEMBALI DITAMBAHKAN KEMBALI DI SINI --- */}
          <div className="text-center mt-10 pt-8 border-t-2 border-[#D6BD98]/20">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-[#D6BD98] text-[#1A3636] font-semibold rounded-xl hover:bg-[#c1a97c] transition-transform transform hover:scale-105"
            >
              ← Kembali
            </button>
          </div>
          
        </div>
      </div>

      {/* --- BAGIAN REKOMENDASI DITAMPILKAN LANGSUNG DI SINI --- */}
      <RecommendationsSection placeId={id} />
    </div>
  );
}