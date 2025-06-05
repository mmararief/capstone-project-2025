import React from "react";

function HomePage() {
  const backgroundImage = "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  return (
    <section className="relative flex-1">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={backgroundImage}
          alt="Jakarta historical building"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[#1A3636] opacity-60 z-10"></div>
      </div>
      {/* Main content, same as hero but without login/signup buttons */}
      <div className="relative z-20 h-[600px] w-full flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Jakarta's <span className="text-[#D6BD98]">Heritage</span> —<br />
            Where <em className="text-[#D6BD98] not-italic font-semibold">Art</em>,
            <em className="text-[#D6BD98] not-italic font-semibold"> Tradition</em>, and
            <em className="text-[#D6BD98] not-italic font-semibold"> Stories</em> Come Alive
          </h1>
          <p className="text-lg md:text-xl text-[#B2F5EA] max-w-2xl mx-auto">
            Explore the rich cultural tapestry of Indonesia's capital through its historic landmarks and vibrant traditions.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A3636] to-transparent z-20"></div>
    </section>
  );
}

export default HomePage;
