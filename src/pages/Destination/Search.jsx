"use client";

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
import { Link } from "react-router-dom";
import { 
  Search as SearchIcon, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc, 
  MapPin, 
  Star,
  Clock,
  DollarSign,
  Loader,
  X,
  Sliders
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Search() {
  const [allPlaces, setAllPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);

  // View and pagination states
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(viewMode === "grid" ? 9 : 12);

  const categories = [
    "All",
    "Budaya",
    "Taman Hiburan", 
    "Cagar Alam",
    "Bahari",
    "Tempat Ibadah",
    "Pusat Perbelanjaan",
  ];

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "avgRating", label: "Rating" },
    { value: "category", label: "Category" }
  ];

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!API_BASE_URL) {
          throw new Error("API configuration not found.");
        }
        const response = await axios.get(`${API_BASE_URL}/places`);
        setAllPlaces(response.data);
        
        // Set initial price range based on data
        if (response.data.length > 0) {
          const prices = response.data
            .map(p => typeof p.price === "number" ? p.price : 0)
            .filter(p => p > 0);
          if (prices.length > 0) {
            setPriceRange([0, Math.max(...prices)]);
          }
        }
      } catch (err) {
        console.error("Error fetching Places:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load attractions. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Enhanced filtering logic
  const filteredPlaces = allPlaces.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemPrice = typeof item.price === "number" ? item.price : 0;
    const matchPrice = itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
    
    return matchCategory && matchSearch && matchPrice;
  });

  // Sorting logic
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle special cases
    if (sortBy === "price") {
      aValue = typeof a.price === "number" ? a.price : 0;
      bValue = typeof b.price === "number" ? b.price : 0;
    }
    
    if (sortBy === "avgRating") {
      aValue = a.avgRating || 0;
      bValue = b.avgRating || 0;
    }
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, sortBy, sortOrder, priceRange, viewMode]);

  // Pagination
  const totalPages = Math.ceil(sortedPlaces.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayPlaces = sortedPlaces.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setSortBy("name");
    setSortOrder("asc");
    setPriceRange([0, Math.max(...allPlaces.map(p => typeof p.price === "number" ? p.price : 0))]);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, currentPage - halfPagesToShow);
      let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow);
      if (currentPage - halfPagesToShow <= 2)
        endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
      if (currentPage + halfPagesToShow >= totalPages - 1)
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2));
      if (startPage > 2) pageNumbers.push("ellipsis_start");
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages - 1) pageNumbers.push("ellipsis_end");
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#1A3636] mb-3">
          Discover Jakarta's Hidden Gems
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore hundreds of amazing attractions, from cultural sites to modern entertainment venues
        </p>
      </div>

      {/* Search and Controls Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search places, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#1A3636] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A3636] focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid" 
                  ? "bg-white text-[#1A3636] shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list" 
                  ? "bg-white text-[#1A3636] shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-colors ${
              showFilters 
                ? "bg-[#1A3636] border-[#1A3636] text-white" 
                : "border-gray-200 text-gray-600 hover:border-[#1A3636]"
            }`}
          >
            <Sliders className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3636]"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3636]"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3636]"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#1A3636] mb-4">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-[#1A3636] border-[#1A3636] text-white shadow-lg"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#1A3636] hover:text-[#1A3636]"
              }`}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {allPlaces.filter(p => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      {!isLoading && !error && (
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing <span className="font-semibold text-[#1A3636]">{currentDisplayPlaces.length}</span> of{" "}
            <span className="font-semibold text-[#1A3636]">{sortedPlaces.length}</span> results
            {searchTerm && (
              <span className="ml-2">
                for "<span className="font-medium text-[#1A3636]">{searchTerm}</span>"
              </span>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="animate-spin h-12 w-12 text-[#1A3636] mb-4" />
          <p className="text-xl text-[#1A3636] font-medium">Loading amazing places...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-semibold text-red-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Places Grid/List */}
      {!isLoading && !error && (
        <>
          {sortedPlaces.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No places found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#1A3636] text-white rounded-lg hover:bg-[#2A4A4A] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {currentDisplayPlaces.map((place) => (
                    <Link to={`/places/${place.id}`} key={place.id} className="group">
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
                        <div className="relative">
                          <img
                            src={place.image_url || "/placeholder.svg"}
                            alt={place.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#1A3636]">
                              {place.category}
                            </span>
                          </div>
                          {place.avgRating && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium text-gray-700">
                                {place.avgRating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-[#1A3636] mb-2 group-hover:text-[#2A4A4A] transition-colors">
                            {place.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {place.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">Jakarta</span>
                            </div>
                            <div className="text-lg font-semibold text-[#1A3636]">
                              {typeof place.price === "number" && place.price > 0
                                ? `Rp ${place.price.toLocaleString("id-ID")}`
                                : "Free"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-4">
                  {currentDisplayPlaces.map((place) => (
                    <Link to={`/places/${place.id}`} key={place.id} className="group">
                      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="flex">
                          <img
                            src={place.image_url || "/placeholder.svg"}
                            alt={place.name}
                            className="w-48 h-32 object-cover flex-shrink-0"
                          />
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-semibold text-[#1A3636] group-hover:text-[#2A4A4A] transition-colors">
                                  {place.name}
                                </h3>
                                <div className="flex items-center gap-2 ml-4">
                                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                    {place.category}
                                  </span>
                                  {place.avgRating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm font-medium text-gray-700">
                                        {place.avgRating.toFixed(1)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                {place.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">Jakarta, Indonesia</span>
                              </div>
                              <div className="text-xl font-semibold text-[#1A3636]">
                                {typeof place.price === "number" && place.price > 0
                                  ? `Rp ${place.price.toLocaleString("id-ID")}`
                                  : "Free"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && sortedPlaces.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {getPageNumbers().map((page, index) => (
                    <PaginationItem
                      key={typeof page === "string" ? `${page}-${index}` : page}
                    >
                      {typeof page === "string" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
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
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
