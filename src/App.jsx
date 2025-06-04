import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/Layout/aboutSection";
import Footer from "./components/Layout/footer";
import Search from "./pages/Search";
import Login from "./pages/Login";

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

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
