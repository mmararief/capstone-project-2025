import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

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
            Discover Jakarta's <span className="text-[#D6BD98]">Heritage</span> —<br/>
            Where <em className="text-[#D6BD98] not-italic font-semibold">Art</em>, 
            <em className="text-[#D6BD98] not-italic font-semibold"> Tradition</em>, and
            <em className="text-[#D6BD98] not-italic font-semibold"> Stories</em> Come Alive
          </h1>

          {/* Subjudul */}
          <p className="text-lg md:text-xl text-[#B2F5EA] max-w-2xl mx-auto">
            Explore the rich cultural tapestry of Indonesia's capital through its historic landmarks and vibrant traditions.
          </p>

          {/* Tombol aksi */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              className="bg-[#1A3636] hover:bg-[#1D4044] text-white px-10 py-3 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#285E61]/40 flex items-center justify-center gap-2"
              onClick={() => navigate("/login")}
            >
              {/* Login icon: user */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Log In
            </button>
            <button
              className="border-2 border-[#D6BD98] text-[#E6FFFA] hover:bg-[#1A3636]/70 px-10 py-3 rounded-lg font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => navigate("/signup")}
            >
              {/* Sign up icon: user-plus */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14v6m3-3h-6m-2-5a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 00-8 0" />
              </svg>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Efek gradasi di bagian bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A3636] to-transparent z-20"></div>
    </section>
  );
}

export default HeroSection;