// src/pages/NearbyPage.jsx

import React from "react";
import useGeolocation from "@/hooks/useGeolocation"; // Pastikan path benar
import { MapPin, RefreshCw, Loader } from "lucide-react";
import RecommendationCarousel from "@/components/RecommendationCarousel"; // Komponen ini sudah menangani fetch datanya sendiri

// Komponen untuk menampilkan Peta (tidak ada perubahan)
const MapDisplay = ({ lat, lon }) => {
  if (!lat || !lon) return null;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lon - 0.01
  },${lat - 0.01},${lon + 0.01},${
    lat + 0.01
  }&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg my-6">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        title="Peta Lokasi"
        aria-label="Peta Lokasi"
      ></iframe>
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
          <h2 className="text-2xl font-semibold">Mencari lokasi Anda...</h2>
          <p>Pastikan Anda mengizinkan akses lokasi pada browser.</p>
        </div>
      );
    }

    // State 2: Gagal mendapatkan lokasi
    if (locationError) {
      return (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-4 text-red-500">
          <MapPin className="h-12 w-12" />
          <h2 className="text-2xl font-semibold">Lokasi Tidak Ditemukan</h2>
          <p className="max-w-md">{locationError}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <RefreshCw size={18} /> Coba Lagi
          </button>
        </div>
      );
    }

    // State 3: Berhasil mendapatkan lokasi
    if (location) {
      return (
        <>
          <MapDisplay lat={location.lat} lon={location.lon} />
          {/* Cukup panggil RecommendationCarousel.
              Komponen ini akan otomatis fetch data menggunakan endpoint yang diberikan. */}
          <RecommendationCarousel
            title="Atraksi Terdekat"
            endpoint={`/recommend/nearby?lat=${location.lat}&lon=${location.lon}&top_n=8`}
          />
        </>
      );
    }

    return null; // Fallback jika tidak ada state yang cocok
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 bg-white min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1A3636] flex items-center justify-center gap-3">
          <MapPin className="text-[#1A3636]" /> Places Near You
        </h1>
        <p className="text-gray-600 mt-2">
          Temukan atraksi wisata luar biasa yang dekat dengan lokasi Anda.
        </p>
        <div className="mt-6 flex justify-center items-center gap-4">
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2">
            <MapPin size={16} /> MENGGUNAKAN LOKASI ANDA
          </span>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 flex items-center gap-2"
          >
            <RefreshCw size={16} /> Refresh Lokasi
          </button>
        </div>
      </div>

      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}