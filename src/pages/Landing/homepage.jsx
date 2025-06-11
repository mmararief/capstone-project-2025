import React from "react";
import HeroSection from "@/components/heroSection"; // Sesuaikan path jika perlu
import AboutSection from "@/components/Layout/aboutSection"; // Sesuaikan path jika perlu
import RecommendationPage from "@/pages/Recommendation/RecommendationPage";
import useAuth from "@/hooks/useAuth";

function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <HeroSection />
      {isLoggedIn && <RecommendationPage />}
      <AboutSection />
    </>
  );
}

export default HomePage;
