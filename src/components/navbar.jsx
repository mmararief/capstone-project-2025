import MobileMenu from "./mobileMenu";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem("isLoggedIn") === "true";

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Scroll to footer when Contact is clicked
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
          <img src="logo2.png" alt="logo" className="h-12 w-auto mr-3" />
          <span className="text-lg font-medium text-[#1A3636]">
            Explore Jakarta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
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
            href="#footer"
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
        </nav>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}

export default Navbar;