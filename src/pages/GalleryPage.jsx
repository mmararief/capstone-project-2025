import React from "react";

const destinations = [
	{
		title: "Monas (National Monument)",
		image: "/monas.jpg",
		description:
			"Jakarta's proud icon symbolizing Indonesia's struggle for independence.",
	},
	{
		title: "Kota Tua (Old Town)",
		image: "/kotatua.jpg",
		description:
			"Historic Dutch colonial center with museums and classic architecture.",
	},
	{
		title: "Taman Mini Indonesia Indah",
		image: "/tmii.jpeg",
		description:
			"A cultural park showcasing Indonesia's diverse heritage and traditional houses.",
	},
	{
		title: "Ancol Dreamland",
		image: "/ancol.jpg",
		description:
			"Jakarta's seaside amusement park with Dufan, SeaWorld, and beautiful beaches.",
	},
	{
		title: "Ragunan Zoo",
		image: "/ragunan.jpg",
		description: "A lush zoo home to hundreds of animal and plant species.",
	},
	{
		title: "National Museum",
		image: "/museum.jpg",
		description:
			"Museum preserving Indonesia's historical artifacts from various eras.",
	},
	{
		title: "Setu Babakan",
		image: "/setubabakan.jpg",
		description:
			"Authentic Betawi cultural village with a scenic lake and traditional houses.",
	},
	{
		title: "Jakarta Aquarium",
		image: "/jktaquarium.jpeg",
		description: "Modern aquarium featuring marine life and interactive shows.",
	},
	{
		title: "Thousand Islands (Kepulauan Seribu)",
		image: "/seribu.jpg",
		description: "Tropical islands north of Jakarta, perfect for marine adventures.",
	},
];

function GalleryPage() {
	return (
		<section className="relative bg-white min-h-screen py-16 px-6 text-[#1A3636]">
			<div className="max-w-7xl mx-auto text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Jakarta{" "}
					<span className="text-[#D6BD98]">Gallery</span>
				</h2>
				<p className="text-[#1A3636] text-lg md:text-xl">
					Explore iconic destinations and hidden gems across the capital.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
				{destinations.map((place, index) => (
					<div
						key={index}
						className="relative group border-4 border-[#D6BD98] rounded-3xl shadow-xl hover:shadow-2xl shadow-[#1A3636]/30 overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col bg-[#1A3636]"
						style={{ minHeight: "320px" }}
					>
						<img
							src={place.image}
							alt={place.title}
							className="w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
							loading="lazy"
						/>
						<div className="absolute left-0 right-0 bottom-0 h-1/2 flex flex-col items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300 bg-[#1A3636]/70 p-6 pointer-events-none">
							<h3 className="text-2xl font-bold text-[#D6BD98] mb-3 text-center drop-shadow-lg">
								{place.title}
							</h3>
							<p className="text-[#E6FFFA] text-base text-center">
								{place.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default GalleryPage;
