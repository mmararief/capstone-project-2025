"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

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

          <nav className="flex flex-col items-center gap-6 p-4">
            <a href="#" className="text-lg font-medium transition-colors hover:text-green-800" onClick={closeMenu}>
              Home
            </a>
            <a href="#about" className="text-lg font-medium transition-colors hover:text-green-800" onClick={closeMenu}>
              About
            </a>
            <a href="#search" className="text-lg font-medium transition-colors hover:text-green-800" onClick={closeMenu}>
              Search
            </a>
            <a href="#gallery" className="text-lg font-medium transition-colors hover:text-green-800" onClick={closeMenu}>
              Gallery
            </a>
            <a
              href="#contact"
              className="text-lg font-medium transition-colors hover:text-green-800"
              onClick={closeMenu}
            >
              Contact
            </a>
            <button className="bg-[#1A3636] hover:bg-[#40534C] text-white px-4 py-2 rounded-md transition-colors">
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
