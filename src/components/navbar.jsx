import MobileMenu from "./mobileMenu"; // Pastikan path ini benar
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Cek status login dari localStorage (menggunakan 'authToken' yang kita simpan sebelumnya)
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("authToken");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Hapus token saat logout
    // Anda mungkin juga ingin menghapus item lain yang berkaitan dengan sesi pengguna
    // localStorage.removeItem("userData"); // misalnya
    navigate("/"); // Arahkan ke halaman utama setelah logout
    // Untuk me-refresh state navbar, bisa juga dengan me-reload halaman jika diperlukan,
    // namun idealnya state management (seperti Context API atau Redux) menangani ini.
    // Untuk contoh sederhana, navigate dan perubahan state isLoggedIn sudah cukup memicu re-render.
  };

  // Scroll to footer when Contact is clicked
  const handleFooterScroll = (e) => {
    e.preventDefault();
    const footer = document.querySelector("footer"); // Pastikan elemen footer ada di halaman
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D6BD98]/30 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="logo2.png" alt="logo" className="h-12 w-auto mr-3" />
          <span className="text-lg font-medium text-[#1A3636]">
            Explore Jakarta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm"> {/* Mengurangi gap sedikit untuk ruang tombol */}
          <Link
            to="/"
            className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]"
          >
            Search
          </Link>
          <Link
            to="/about"
            className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]"
          >
            About
          </Link>
          <a
            href="#footer" // Pastikan ada elemen dengan id="footer"
            className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]"
            onClick={handleFooterScroll}
          >
            Contact
          </a>
          <Link
            to="/gallery"
            className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A]"
          >
            Gallery
          </Link>

          {/* Tombol Login/Register atau Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="font-medium text-white bg-[#1A3636] hover:bg-[#40534C] px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-[#1A3636] transition-colors hover:text-[#677D6A] px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="font-medium text-white bg-[#1A3636] hover:bg-[#40534C] px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Tetap Membutuhkan Penyesuaian Serupa */}
        {/* Anda perlu memodifikasi MobileMenu untuk juga menampilkan tombol Login/Register/Logout secara kondisional */}
        <div className="md:hidden"> {/* Wrapper untuk MobileMenu agar tombol Login/Register di desktop tidak mempengaruhinya langsung */}
            <MobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;