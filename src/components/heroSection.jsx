import React from "react";

function HeroSection() {
  return (
    <section className="relative flex-1">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative h-[500px] w-full">
        <img
          src="#"
          alt="Jakarta historical building"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Navigate Jakarta's beauty—<em>art, tradition,</em> and
            <em>stories</em> worth exploring.
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-2 rounded-md">
              Sign Up
            </button>
            <button className="border border-white text-white hover:bg-white/10 px-8 py-2 rounded-md">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
