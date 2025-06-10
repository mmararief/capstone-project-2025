import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/Layout/aboutSection";
import Footer from "./components/Layout/footer";
import Search from "./pages/Destination/Search";
import Login from "./pages/Auth/Login";
import GalleryPage from "./pages/Destination/GalleryPage";
import HomePage from "./pages/Landing/homepage";
import Register from "./pages/Auth/Register";
import DetailPage from "./pages/Destination/detailPage";

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
                <HeroSection />
                <AboutSection />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
