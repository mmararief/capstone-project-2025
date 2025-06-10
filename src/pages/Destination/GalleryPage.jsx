import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const truncateWords = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

function GalleryPage() {
  const [allPlaces, setAllPlaces] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); 
  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!API_BASE_URL) {
          throw new Error("Konfigurasi API base URL tidak ditemukan.");
        }
        const response = await axios.get(`${API_BASE_URL}/places`);
        setAllPlaces(response.data); // Simpan semua data
      } catch (err) {
        console.error("Error fetching places:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal memuat daftar tempat. Silakan coba lagi nanti."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayedPlaces = allPlaces.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allPlaces.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; 
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); 
      let startPage = Math.max(2, currentPage - halfPagesToShow);
      let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow);

      if (currentPage - halfPagesToShow <= 2) {
        endPage = Math.min(totalPages - 1, maxPagesToShow -1); 
      }
      if (currentPage + halfPagesToShow >= totalPages - 1) {
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2) );
      }
      
      if (startPage > 2) {
        pageNumbers.push("ellipsis_start");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis_end");
      }
      
      pageNumbers.push(totalPages); 
    }
    return pageNumbers;
  };


  return (
    <section className="relative bg-white min-h-screen py-16 px-6 text-[#1A3636]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Jakarta <span className="text-[#D6BD98]">Gallery</span>
        </h2>
        <p className="text-[#1A3636] text-lg md:text-xl">
          Explore iconic destinations and hidden gems across the capital.
        </p>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-xl text-[#1A3636]">Loading destinations...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="max-w-2xl mx-auto text-center py-10 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h3>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && currentDisplayedPlaces.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {currentDisplayedPlaces.map((place) => (
            <div
              key={place.id}
              className="relative group border-4 border-[#D6BD98] rounded-3xl shadow-xl hover:shadow-2xl shadow-[#1A3636]/30 overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col bg-[#1A3636]"
              style={{ minHeight: "320px" }}
            >
              <img
                src={place.image_url}
                alt={place.name}
                className="w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/2 flex flex-col items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300 bg-[#1A3636]/70 p-6 pointer-events-none">
                <h3 className="text-2xl font-bold text-[#D6BD98] mb-3 text-center drop-shadow-lg">
                  {place.name}
                </h3>
                <p className="text-[#E6FFFA] text-base text-center">
                  {truncateWords(place.description, 12)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && allPlaces.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-[#40534C]">No destinations found at the moment. Please check back later.</p>
        </div>
      )}

      {!isLoading && !error && totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={typeof page === 'string' ? `${page}-${index}` : page}>
                  {typeof page === 'string' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}

export default GalleryPage;