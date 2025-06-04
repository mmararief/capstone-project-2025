"use client";

import { useState } from "react";

export default function Search() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Cultural & Heritage",
    "Urban & Modern",
    "Nature & Recreation",
  ];

  const attractions = [
    {
      id: 1,
      name: "National Monument (Monas)",
      image: "/monas.jpg",
      description:
        "Discover Jakarta's iconic landmark and enjoy panoramic city views from the top.",
      category: "Cultural & Heritage",
      price: "Rp 20.000",
    },
    {
      id: 2,
      name: "Kota Tua Jakarta",
      image: "/kotatua.jpg",
      description:
        "Step back in time with this historic area featuring colonial architecture and museums.",
      category: "Cultural & Heritage",
      price: "Free",
    },
    {
      id: 3,
      name: "Grand Indonesia Mall",
      image: "/mallgi.jpeg",
      description:
        "Shop, dine, and enjoy entertainment at one of Jakarta’s largest modern malls.",
      category: "Urban & Modern",
      price: "Free Entry",
    },
    {
      id: 4,
      name: "Taman Mini Indonesia Indah",
      image: "/tmii.jpeg",
      description:
        "Explore Indonesia’s diverse culture in one vast recreational park.",
      category: "Nature & Recreation",
      price: "Rp 30.000",
    },
  ];

  const filteredAttractions = attractions.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Search Bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-full border-2 border-[#677D6A] bg-[#F5F5F5] text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#D6BD98]"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-[#1A3636] mb-5">
          Explore by Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border-2 text-sm transition-colors ${
                activeCategory === category
                  ? "bg-[#1A3636] border-[#1A3636] text-white"
                  : "bg-[#F5F5F5] border-[#D6BD98] text-[#40534C] hover:bg-[#D6BD98]/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Attraction Cards */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAttractions.map((attraction) => (
          <div
            key={attraction.id}
            className="relative group border-4 border-[#D6BD98] rounded-3xl shadow-xl hover:shadow-2xl shadow-[#1A3636]/30 overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col bg-[#1A3636]"
            style={{ minHeight: "320px" }}
          >
            <img
              src={attraction.image || "/placeholder.svg"}
              alt={attraction.name}
              className="w-full h-60 object-cover object-center"
            />
            <div className="flex-1 flex flex-col justify-end">
              <div className="p-6 bg-[#1A3636] bg-opacity-90 rounded-b-3xl">
                <h3 className="text-2xl font-bold text-[#D6BD98] mb-2 text-center drop-shadow-lg">
                  {attraction.name}
                </h3>
                <p className="text-[#E6FFFA] text-base text-center">
                  {attraction.description}
                </p>
                <p className="text-[#D6BD98] text-base text-center font-semibold mt-2">
                  {attraction.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
