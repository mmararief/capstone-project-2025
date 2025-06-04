import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/Layout/aboutSection";
import Footer from "./components/Layout/footer";
import Search from "./pages/Search";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/homepage";

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
