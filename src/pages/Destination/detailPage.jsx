// src/pages/DetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceCard from "@/components/PlaceCard";
import MapDisplay from "@/components/MapDisplay";
import { ArrowLeft, MapPin, Star, DollarSign, Clock, Users } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [placeId]);

  if (loading) {
    return (
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading recommendations...
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1A3636] mb-2">
          You Might Also Like
        </h2>
        <p className="text-[#677D6A]">Similar places that other visitors loved</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-8 px-8">
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
  const [ratingSuccess, setRatingSuccess] = useState(false);
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
        setError("Place not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id, accessToken]);

  const handleRating = async (value) => {
    if (!accessToken) {
      alert("Please login to rate this place.");
      return;
    }
    if (isSubmitting) return;
    
    // Validate rating value
    if (!value || value < 1 || value > 5) {
      alert("Please select a rating between 1 and 5 stars.");
      return;
    }
    
    setIsSubmitting(true);
    setRatingSuccess(false);
    
    console.log("Submitting rating:", { value, placeId: id, endpoint: `${API_BASE_URL}/places/${id}/rate` });
    
    try {
      const ratingResponse = await axios.post(
        `${API_BASE_URL}/places/${id}/rate`,
        { value },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      
      console.log("Rating submission successful:", ratingResponse.data);
      setUserRating(value);
      setRatingSuccess(true);
      
      // Refresh place data to get updated rating
      const updatedPlace = await axios.get(`${API_BASE_URL}/places/${id}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      });
      setPlace(updatedPlace.data);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setRatingSuccess(false), 3000);
      
    } catch (err) {
      console.error("Rating submission error:", err);
      console.error("Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers
      });
      
      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again to rate this place.");
      } else if (err.response?.status === 400) {
        alert("Invalid rating value. Please try again with a rating between 1-5 stars.");
      } else if (err.response?.status === 404) {
        alert("This place was not found. Please refresh the page and try again.");
      } else if (err.response?.status === 500) {
        alert("Server error occurred. Please try again later.");
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        alert("Network error. Please check your internet connection and try again.");
      } else {
        alert(`Failed to submit rating: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (ratingValue, interactive = false, onStarClick = () => {}) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={24}
        onClick={() => interactive && !isSubmitting && onStarClick(star)}
        onMouseEnter={() => interactive && setHoverRating(star)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        className={`transition-all duration-200 ${
          interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
        } ${
          (interactive ? hoverRating || ratingValue : ratingValue) >= star
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-300"
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
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-lg">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-[#1A3636]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium text-[#1A3636]">Loading place details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 bg-[#1A3636] text-white rounded-lg hover:bg-[#40534C] transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!place) return null;

  const roundedAvgRating = place.avgRating ? Math.round(place.avgRating * 2) / 2 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-[#1A3636] hover:text-[#40534C] transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Image Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img
            src={place.image_url || "/placeholder.svg"}
            alt={place.name}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1A3636] font-semibold rounded-full text-sm">
              <MapPin size={16} className="mr-2" />
              {place.category}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {place.name}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(roundedAvgRating, false)}
                </div>
                <span className="font-semibold">
                  {place.avgRating?.toFixed(1) || "N/A"}
                </span>
                <span className="text-sm">({place.totalRatings || 0} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#1A3636] mb-4">About This Place</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {place.description}
              </p>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#1A3636] mb-6">Rate Your Experience</h3>
              
              {accessToken ? (
                <div className="space-y-4">
                  <p className="text-gray-600">How was your visit to {place.name}?</p>
                  
                  {/* Success message */}
                  {ratingSuccess && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Thank you! Your rating has been submitted successfully.</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(userRating, true, handleRating)}
                    </div>
                    {userRating > 0 && (
                      <span className="text-sm text-gray-500 ml-2">
                        You rated this {userRating} star{userRating !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {isSubmitting && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting your rating...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-xl">
                  <Star size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-4">Login to rate this place and share your experience</p>
                  <a
                    href="/login"
                    className="inline-flex items-center px-6 py-3 bg-[#1A3636] text-white rounded-lg hover:bg-[#40534C] transition-colors font-medium"
                  >
                    Login to Rate
                  </a>
                </div>
              )}
            </div>

            {/* Map Section */}
            <MapDisplay place={place} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#1A3636] mb-4">Quick Info</h3>
              <div className="space-y-4">
                {/* Price */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {typeof place.price === "number" && place.price > 0
                        ? `Rp ${place.price.toLocaleString("id-ID")}`
                        : "Free Entry"}
                    </p>
                    <p className="text-sm text-gray-500">Admission</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {place.avgRating?.toFixed(1) || "No ratings yet"}
                    </p>
                    <p className="text-sm text-gray-500">Average rating</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{place.category}</p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Tips Card */}
            <div className="bg-gradient-to-br from-[#1A3636] to-[#40534C] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Visit Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Clock size={16} className="text-[#D6BD98] mt-0.5 flex-shrink-0" />
                  <p>Best visited during morning hours for fewer crowds</p>
                </div>
                <div className="flex items-start gap-2">
                  <Users size={16} className="text-[#D6BD98] mt-0.5 flex-shrink-0" />
                  <p>Perfect for families and solo travelers</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#D6BD98] mt-0.5 flex-shrink-0" />
                  <p>Easily accessible by public transportation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <RecommendationsSection placeId={id} />
      </div>
    </div>
  );
}