import React from "react";
import { Link } from "react-router-dom"; // 1. Impor komponen Link

function HeroSection() {
  return (
    <section className="relative flex-1">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/jkt.jpg"
          alt="Jakarta historical building"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[#1A3636] opacity-60 z-10"></div>
      </div>

      {/* Konten utama */}
      <div className="relative z-20 h-[600px] w-full flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-4xl text-center space-y-6">
          {/* Judul utama dengan warna aksen */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Jakarta's <span className="text-[#D6BD98]">Heritage</span> —
            <br />
            Where <em className="text-[#D6BD98] not-italic font-semibold">Art</em>,
            <em className="text-[#D6BD98] not-italic font-semibold"> Tradition</em>, and
            <em className="text-[#D6BD98] not-italic font-semibold"> Stories</em> Come Alive
          </h1>

          {/* Subjudul */}
          <p className="text-lg md:text-xl text-[#B2F5EA] max-w-2xl mx-auto">
            Explore the rich cultural tapestry of Indonesia's capital through its historic landmarks and vibrant traditions.
          </p>

          {/* --- BAGIAN TOMBOL AKSI DITAMBAHKAN DI SINI --- */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-block w-full sm:w-auto px-8 py-3 font-bold text-[#1A3636] bg-[#D6BD98] rounded-lg shadow-lg hover:bg-[#c1a97c] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-block w-full sm:w-auto px-8 py-3 font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-[#1A3636] transition-colors duration-300"
            >
              Login
            </Link>
          </div>
          
        </div>
      </div>

      {/* Efek gradasi di bagian bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A3636] to-transparent z-20"></div>
    </section>
  );
}

export default HeroSection;
