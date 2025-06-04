import MobileMenu from "./mobileMenu";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="logo.png" alt="logo" className="h-12 w-auto mr-3" />
          <span className="text-lg font-medium text-green-800">
            Explore Jakarta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="font-medium transition-colors hover:text-green-800"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="font-medium transition-colors hover:text-green-800"
          >
            Search
          </Link>
          <a
            href="#about"
            className="font-medium transition-colors hover:text-green-800"
          >
            About
          </a>
          <a
            href="#contact"
            className="font-medium transition-colors hover:text-green-800"
          >
            Contact
          </a>
        </nav>

        {/* Sign Up Button */}
        <div className="hidden md:block">
          <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}

export default Navbar;
