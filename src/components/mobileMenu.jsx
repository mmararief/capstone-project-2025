// / src/components/mobileMenu.jsx

"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

function MobileMenu({ isLoggedIn, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleLinkClick = () => {
    closeMenu()
  }

  const handleLogoutClick = () => {
    handleLogout()
    closeMenu()
  }

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2 rounded-md border border-gray-200" aria-label="Toggle menu">
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-end p-4">
            <button onClick={closeMenu} className="p-2 rounded-md" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-8 p-4 text-[#1A3636]">
            {/* --- LINK YANG SELALU TAMPIL --- */}
            <Link to="/" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              Home
            </Link>
            <Link to="/search" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              Search
            </Link>
            <Link to="/developer" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              Developer
            </Link>

            {/* --- KONTEN MENU YANG BERUBAH BERDASARKAN LOGIN --- */}
            {isLoggedIn ? (
              // Tampilan SAAT SUDAH LOGIN
              <>
                <Link
                  to="/nearby"
                  onClick={handleLinkClick}
                  className="text-lg font-medium text-[#1A3636] hover:text-[#677D6A]"
                >
                  Nearby
                </Link>
                {/* Garis pemisah */}
                <div className="w-1/2 border-b border-gray-200"></div>
                <button
                  onClick={handleLogoutClick}
                  className="bg-[#D63447] hover:bg-[#b02a3a] text-white px-6 py-2 rounded-lg transition-colors w-full max-w-xs text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              // Tampilan SAAT BELUM LOGIN
              <>
                <Link to="/about" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
                  About
                </Link>
                <Link to="/gallery" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
                  Gallery
                </Link>
                {/* Garis pemisah */}
                <div className="w-1/2 border-b border-gray-200"></div>
                <div className="flex flex-col gap-4 w-full items-center">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-[#1A3636] hover:text-[#677D6A]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="bg-[#1A3636] hover:bg-[#40534C] text-white px-6 py-2 rounded-lg transition-colors w-full max-w-xs text-center"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu;
