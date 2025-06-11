// src/pages/RecommendationPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import RecommendationCarousel from "@/components/RecommendationCarousel";
import useGeolocation from "@/hooks/useGeolocation"; // Pastikan path benar
import useAuth from "@/hooks/useAuth";

export default function RecommendationPage() {
  // 1. Dapatkan lokasi pengguna untuk rekomendasi terdekat
  const { location, error: locationError, loading: locationLoading } = useGeolocation();

  // 2. Dapatkan data user dari JWT token menggunakan useAuth hook
  const { userId, userPreferences, isLoading: authLoading } = useAuth();
  
  // Show loading state if auth is still loading
  if (authLoading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg text-[#40534C]">Loading your personalized recommendations...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header section dengan design yang lebih minimalis */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3636] mb-4">
            Discover Your Next Adventure
          </h2>
          {userPreferences.length > 0 && (
            <p className="text-lg text-[#677D6A] max-w-2xl mx-auto">
              Curated recommendations based on your love for {userPreferences.join(" & ")} experiences
            </p>
          )}
        </div>

        {/* Rak 1: Rekomendasi Hybrid berdasarkan User */}
        <RecommendationCarousel
          title="Handpicked For You"
          endpoint={`/recommend/by_hybrid?user_id=${userId}&top_n=5`}
        />

        {/* Rak 2: Rekomendasi Tempat Terdekat (hanya tampil jika lokasi didapat) */}
        {location && (
          <RecommendationCarousel
            title="Nearby Gems"
            endpoint={`/recommend/nearby?lat=${location.lat}&lon=${location.lon}&top_n=8`}
          />
        )}
        
        {/* Tampilkan pesan saat lokasi sedang dimuat */}
        {locationLoading && (
          <div className="text-center py-8 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding amazing places near you...
            </div>
          </div>
        )}
        
        {/* Tampilkan pesan jika terjadi error saat mengambil lokasi */}
        {locationError && (
          <div className="text-center py-8 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {locationError}
            </div>
          </div>
        )}
        
        {/* Rak 3: Rekomendasi berdasarkan Preferensi User dari JWT (hanya tampil jika user memiliki preferensi) */}
        {userPreferences.length > 0 ? (
          <RecommendationCarousel
            title={`${userPreferences.join(" & ")} Destinations`}
            endpoint={`/recommend/by_category?categories=${userPreferences.join(",")}&top_n=8`}
          />
        ) : (
          <div className="text-center py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#1A3636] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1A3636] mb-3">
                Set Your Preferences
              </h3>
              <p className="text-[#677D6A] mb-6">
                Tell us what you love and we'll recommend amazing places that match your interests perfectly.
              </p>
              <Link
                to="/profile"
                className="inline-flex items-center px-6 py-3 bg-[#1A3636] text-white rounded-lg hover:bg-[#40534C] transition-colors font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Preferences
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
