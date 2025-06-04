"use client";

import { useState } from "react";

export default function Search() {
  const [activeCategory, setActiveCategory] = useState("Cultural & Heritage");

  const categories = [
    "Cultural & Heritage",
    "Urban & Modern",
    "Nature & Recreation",
  ];

  const attractions = [
    {
      id: 1,
      name: "Nasional Monumen (Monas)",
      // image: monasImage,
      description:
        "Explore Jakarta's digital travel companion designed to help you discover the best of Indonesia's capital city. From iconic landmarks to hidden gems, we make your journey effortless and inspiring.",
    },
    {
      id: 2,
      name: "Nasional Monumen (Monas)",
      // image: monasImage,
      description:
        "Explore Jakarta's digital travel companion designed to help you discover the best of Indonesia's capital city. From iconic landmarks to hidden gems, we make your journey effortless and inspiring.",
    },
    {
      id: 3,
      name: "Nasional Monumen (Monas)",
      // image: monasImage,
      description:
        "Explore Jakarta's digital travel companion designed to help you discover the best of Indonesia's capital city. From iconic landmarks to hidden gems, we make your journey effortless and inspiring.",
    },
    {
      id: 4,
      name: "Nasional Monumen (Monas)",
      // image: monasImage,
      description:
        "Explore Jakarta's digital travel companion designed to help you discover the best of Indonesia's capital city. From iconic landmarks to hidden gems, we make your journey effortless and inspiring.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="mb-8">
        <input
          type="text"
          className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="Search destinations..."
        />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium mb-4">
          Explore by Categories
        </h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2 border rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? "bg-[#9ed49a] border-[#9ed49a] text-gray-800"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={attraction.image || "/placeholder.svg"}
              alt={attraction.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{attraction.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {attraction.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
