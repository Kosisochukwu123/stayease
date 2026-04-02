import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";
import GuestDetails from "./pages/GuestDetails";
import Attractions from "./pages/Attractions";
import ScrollToTop from "./components/ScrollToTop";

import Footer from "./components/Footer";
import About from "./pages/footer/About";
import Careers from "./pages/footer/Careers";
import Press from "./pages/footer/Press";
import Blog from "./pages/footer/Blog";
import HelpCentre from "./pages/footer/HelpCentre";
import CancellationPolicy from "./pages/footer/CancellationPolicy";
import SafetyInfo from "./pages/footer/SafetyInfo";
import Contact from "./pages/footer/Contact";
import Privacy from "./pages/footer/Privacy";
import Terms from "./pages/footer/Terms";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:id" element={<HotelDetail />} />
              <Route
                path="/hotels/:id/guest-details"
                element={<GuestDetails />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/attractions" element={<Attractions />} />

              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/help" element={<HelpCentre />} />
              <Route
                path="/cancellation-policy"
                element={<CancellationPolicy />}
              />
              <Route path="/safety" element={<SafetyInfo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
