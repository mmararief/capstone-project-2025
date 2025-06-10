// src/pages/RecommendationPage.jsx

import React from "react";
import RecommendationCarousel from "@/components/RecommendationCarousel";
import useGeolocation from "@/hooks/useGeolocation"; // Pastikan path benar

export default function RecommendationPage() {
  // 1. Dapatkan lokasi pengguna untuk rekomendasi terdekat
  const { location, error: locationError, loading: locationLoading } = useGeolocation();

  // 2. Dapatkan ID user yang sedang login.
  // Ganti ini dengan logika Anda, misalnya dari context atau local storage.
  const userId = 1; // Contoh statis, harusnya dinamis

  // 3. Tentukan kategori yang ingin ditampilkan
  const categories = ["Kuliner", "Alam", "Museum", "Belanja"];
  
  return (
    <div className="max-w-7xl mx-auto py-10 px-10 bg-gray-50 text-gray-800 min-h-screen"> {/* Latar belakang diubah agar teks loading terlihat */}
      <h1 className="text-4xl font-bold text-center text-[#1A3636] mb-12">
        Temukan Petualangan Berikutnya
      </h1>

      {/* Rak 1: Rekomendasi Collaborative berdasarkan User */}
      <RecommendationCarousel
        title="Pilihan Spesial Untukmu"
        endpoint={`/recommend/by_user?user_id=${userId}&top_n=8`}
      />

      {/* Rak 2: Rekomendasi Hybrid berdasarkan User */}
      <RecommendationCarousel
        title="Gabungan Terbaik (Hybrid)"
        endpoint={`/recommend/by_hybrid?user_id=${userId}&top_n=8`}
      />

      {/* --- BAGIAN INI SEKARANG DIAKTIFKAN KEMBALI --- */}
      {/* Rak 3: Rekomendasi Tempat Terdekat (hanya tampil jika lokasi didapat) */}
      {location && (
        <RecommendationCarousel
          title="Ada Apa di Dekatmu?"
          endpoint={`/recommend/nearby?lat=${location.lat}&lon=${location.lon}&top_n=8`}
        />
      )}
      {/* Tampilkan pesan saat lokasi sedang dimuat */}
      {locationLoading && <p className="text-center text-gray-500 py-4">Mencari lokasimu...</p>}
      {/* Tampilkan pesan jika terjadi error saat mengambil lokasi */}
      {locationError && <p className="text-center text-red-500 py-4">{locationError}</p>}
      
      {/* Rak 4: Rekomendasi berdasarkan Kategori (looping) */}
      {categories.map(category => (
         <RecommendationCarousel
            key={category}
            title={`Kategori: ${category}`}
            endpoint={`/recommend/by_category?categories=${category.toLowerCase()}&top_n=8`}
          />
      ))}

    </div>
  );
}
