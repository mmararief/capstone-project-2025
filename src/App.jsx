// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/Layout/AboutSection";
import Navbar from "./components/navbar";
import Footer from "./components/Layout/footer";
import Search from "./pages/Destination/Search";
import Login from "./pages/Auth/Login";
import GalleryPage from "./pages/Destination/GalleryPage";
import HomePage from "./pages/Landing/homepage";
import Register from "./pages/Auth/Register";
import DetailPage from "./pages/Destination/detailPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/Landing/MainPage";
import NearbyPage from "./pages/Recommendation/NearbyPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPage />
              </>
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/info" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/detailpage" element={<DetailPage />} />
          <Route path="/places/:id" element={<DetailPage />} />
          <Route
            path="/nearby"
            element={
              <PrivateRoute>
                <NearbyPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
