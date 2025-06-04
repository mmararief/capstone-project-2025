function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-[#F5F5F5]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="logo2.png"
              alt="Historical building in Jakarta"
              className="rounded-lg w-full max-w-md mx-auto shadow-md border-2 border-[#D6BD98]/50"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-bold text-[#1A3636]">
              Welcome to <span className="text-[#285E61]">Explore Jakarta</span>
            </h2>

            <h3 className="text-2xl font-semibold text-[#40534C]">About the App</h3>

            <div className="space-y-4 text-[#40534C]">
              <p className="leading-relaxed">
                Discover Jakarta in a new light. Our app is your curated guide to
                the capital city's most captivating destinations—from historical
                landmarks and cultural treasures to culinary delights and modern
                attractions.
              </p>

              <p className="leading-relaxed">
                Designed for both locals and travelers, this app helps you explore
                Jakarta effortlessly with insightful recommendations, interactive
                maps, and up-to-date travel tips.
              </p>

              <p className="leading-relaxed">
                Let every journey in Jakarta be memorable. Your adventure starts
                here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;