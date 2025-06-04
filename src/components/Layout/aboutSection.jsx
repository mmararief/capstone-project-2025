function AboutSection() {
  return (
    <section id="about" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src="logo.png"
              alt="Historical building in Jakarta"
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">
              Welcome to Explore Jakarta
            </h2>

            <h3 className="text-xl font-semibold mb-3">About the App</h3>

            <p className="mb-4">
              Discover Jakarta in a new light. Our app is your curated guide to
              the capital city's most captivating destinations—from historical
              landmarks and cultural treasures to culinary delights and modern
              attractions.
            </p>

            <p className="mb-4">
              Designed for both locals and travelers, this app helps you explore
              Jakarta effortlessly with insightful recommendations, interactive
              maps, and up-to-date travel tips.
            </p>

            <p className="mb-4">
              Let every journey in Jakarta be memorable. Your adventure starts
              here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
