import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Room from "./pages/Room";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

export default function App() {
  const location = useLocation();

  const isRoomPage = location.pathname.startsWith("/room/");

  return (
    <>
      <ScrollToTop />

      {!isRoomPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>

      {!isRoomPage && <Footer />}
    </>
  );
}