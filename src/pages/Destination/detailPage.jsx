import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessToken = localStorage.getItem("authToken");

  useEffect(() => {
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
          setRating(res.data.userRating);
        } else {
          const savedRating = localStorage.getItem(`placeRating_${id}`);
          if (savedRating) {
            setRating(Number(savedRating));
          }
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
      const res = await axios.post(
        `${API_BASE_URL}/places/${id}/rate`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setRating(res.data.value);
      localStorage.setItem(`placeRating_${id}`, res.data.value);
    } catch (err) {
      console.error("Gagal mengirim rating:", err.response || err.message || err);
      alert("Gagal mengirim rating. Pastikan Anda login dan token valid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => !isSubmitting && handleRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        className={`cursor-pointer text-3xl transition-colors ${
          (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-400"
        } ${isSubmitting ? "pointer-events-none opacity-50" : ""}`}
        aria-label={`${star} star`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleRating(star);
          }
        }}
      >
        ★
      </span>
    ));
  };

  if (loading) return <p className="text-center py-20 text-xl">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!place) return null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-[#1A3636] border-4 border-[#D6BD98] rounded-3xl shadow-xl overflow-hidden">
        <img
          src={place.image_url || "/placeholder.svg"}
          alt={place.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-8 bg-[#1A3636] text-[#E6FFFA]">
          <h1 className="text-4xl font-bold text-[#D6BD98] mb-4 text-center">{place.name}</h1>
          <p className="text-lg mb-4 text-center">{place.description}</p>
          <p className="text-xl font-semibold text-center text-[#D6BD98]">
            {typeof place.price === "number"
              ? `Rp ${place.price.toLocaleString("id-ID")}`
              : place.price}
          </p>

          {/* RATING BINTANG */}
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-[#E6FFFA] mb-2">Beri Rating Tempat Ini:</h3>
            {accessToken ? (
              <div className="flex justify-center gap-1" aria-label="Rating stars">
                {renderStars()}
              </div>
            ) : (
              <p className="text-sm text-[#D6BD98]">Login untuk memberi rating ⭐</p>
            )}
          </div>

          {/* Tombol Kembali */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-[#D6BD98] text-[#1A3636] font-semibold rounded-xl hover:bg-[#c1a97c] transition"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
