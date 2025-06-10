// src/components/Navbar.jsx

import MobileMenu from "./mobileMenu"; // Pastikan path ini benar
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Cek status login dari localStorage
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // Juga hapus userData agar sapaan di halaman rekomendasi hilang
    localStorage.removeItem("userData"); 
    navigate("/");
    window.location.reload(); // Reload untuk memastikan state di semua komponen ter-update
  };

  const handleFooterScroll = (e) => {
    e.preventDefault();
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D6BD98]/30 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo2.png" alt="logo" className="h-12 w-auto mr-3" /> {/* Pastikan path logo benar */}
          <span className="text-lg font-medium text-[#1A3636]">
            Explore Jakarta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {/* Link yang selalu tampil */}
          <Link to="/" className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]">
            Home
          </Link>
          <Link to="/search" className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]">
            Search
          </Link>

          {/* === KONTEN NAVBAR YANG BERUBAH BERDASARKAN LOGIN === */}
          {isLoggedIn ? (
            // Tampilan SAAT SUDAH LOGIN
            <>
              <Link
                to="/nearby"
                className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]"
              >
                Nearby
              </Link>
              <button
                onClick={handleLogout}
                className="font-medium text-white bg-[#D63447] hover:bg-[#b02a3a] px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            // Tampilan SAAT BELUM LOGIN
            <>
              <Link to="/about" className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]">
                About
              </Link>
              <a href="#footer" className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]" onClick={handleFooterScroll}>
                Contact
              </a>
              <Link to="/gallery" className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]">
                Gallery
              </Link>
              <Link to="/login" className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A] px-3 py-2">
                Login
              </Link>
              <Link to="/register" className="font-medium text-white bg-[#1A3636] hover:bg-[#40534C] px-4 py-2 rounded-lg transition-colors text-sm">
                Register
              </Link>
            </>
          )}
        </nav>
        
        <div className="md:hidden">
            {/* Anda juga perlu menyesuaikan MobileMenu.jsx dengan logika yang sama */}
            <MobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;