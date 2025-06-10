// src/pages/MainPage.jsx

import React from "react";
// 1. Impor HomePage dan RecommendationPage
import HomePage from "./homepage";// Sesuaikan path jika perlu
import RecommendationPage from "../Recommendation/RecommendationPage";

export default function MainPage() {
  // Logika untuk memeriksa status login dari localStorage
  const isLoggedIn = !!localStorage.getItem("authToken");

  // Jika sudah login, tampilkan RecommendationPage.
  // Jika belum, tampilkan HomePage.
  return isLoggedIn ? <RecommendationPage/> : <HomePage />;
}