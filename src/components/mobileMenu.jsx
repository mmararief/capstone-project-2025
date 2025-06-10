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

  const handleFooterScroll = (e) => {
    e.preventDefault()
    const footer = document.querySelector("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
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

          <nav className="flex flex-col items-center gap-6 p-4 text-[#1A3636]">
            <Link to="/" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              Home
            </Link>
            <Link to="/about" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              About
            </Link>
            <Link to="/search" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              Search
            </Link>
            <Link to="/gallery" onClick={handleLinkClick} className="text-lg font-medium hover:text-[#677D6A]">
              Gallery
            </Link>
            <a
              href="#footer"
              onClick={handleFooterScroll}
              className="text-lg font-medium hover:text-[#677D6A]"
            >
              Contact
            </a>

            {isLoggedIn ? (
              <button
                onClick={handleLogoutClick}
                className="bg-[#1A3636] hover:bg-[#40534C] text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2 w-full items-center">
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="text-[#1A3636] font-medium hover:text-[#677D6A]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="bg-[#1A3636] hover:bg-[#40534C] text-white px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
