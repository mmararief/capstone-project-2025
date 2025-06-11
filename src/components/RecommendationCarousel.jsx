// src/components/RecommendationCarousel.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PlaceCard from "./PlaceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function RecommendationCarousel({ title, endpoint }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}${endpoint}`);
        setPlaces(res.data);
      } catch (err) {
        console.error(`Failed to fetch ${title}:`, err);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [endpoint, title]);

  // Check scroll position untuk enable/disable navigation buttons
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [places]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Width of card + gap
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A3636]">{title}</h2>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex gap-6 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0">
              {/* Skeleton PlaceCard */}
              <div className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded-md mb-3 w-20"></div>
                  <div className="h-6 bg-gray-300 rounded-md mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-md mb-4 w-24"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded-md w-16"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-12"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (places.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      {/* Header dengan Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A3636]">{title}</h2>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border-2 transition-all duration-300 ${
              canScrollLeft
                ? 'border-[#1A3636] text-[#1A3636] hover:bg-[#1A3636] hover:text-white shadow-md hover:shadow-lg transform hover:scale-105'
                : 'border-gray-300 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border-2 transition-all duration-300 ${
              canScrollRight
                ? 'border-[#1A3636] text-[#1A3636] hover:bg-[#1A3636] hover:text-white shadow-md hover:shadow-lg transform hover:scale-105'
                : 'border-gray-300 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Overlays untuk visual cue */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
          onScroll={checkScrollButtons}
        >
          {places.map((place, index) => (
            <div
              key={`${title}-${place.id}`}
              className="flex-shrink-0 transform transition-all duration-300 hover:scale-105"
              style={{
                animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <PlaceCard place={place} />
            </div>
          ))}
          
          {/* Spacer untuk scroll effect */}
          <div className="flex-shrink-0 w-8"></div>
        </div>
      </div>

      {/* Scroll Indicator Dots */}
      {places.length > 3 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(places.length / 3) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}