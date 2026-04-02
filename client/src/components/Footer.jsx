import { Link } from "react-router-dom";
import "./Footer.css";

const DESTINATIONS = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"];

const LINKS = {
  Explore: [
    { label: "All Hotels", to: "/hotels" },
    { label: "Lagos Hotels", to: "/hotels?city=Lagos" },
    { label: "Abuja Hotels", to: "/hotels?city=Abuja" },
    { label: "Port Harcourt", to: "/hotels?city=Port Harcourt" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/press" },
    { label: "Blog", to: "/blog" },
  ],
  Support: [
    { label: "Help Centre", to: "/help" },
    { label: "Cancellation Policy", to: "/cancellation-policy" },
    { label: "Safety Information", to: "/safety" },
    { label: "Contact Us", to: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Top row */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              StayEase
            </Link>
            <p className="footer-tagline">
              Curated stays across Africa's most vibrant cities. Book with
              confidence, travel with ease.
            </p>
            <div className="footer-socials">
              <a href="/" aria-label="Instagram" className="footer-social-btn">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="/"
                aria-label="Twitter / X"
                className="footer-social-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.802l4.258 5.63 5.934-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="/" aria-label="Facebook" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading} className="footer-col">
              <h5>{heading}</h5>
              <ul>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular destinations strip */}
        <div className="footer-destinations">
          <span className="footer-dest-label">Popular destinations:</span>
          <div className="footer-dest-tags">
            {DESTINATIONS.map((city) => (
              <Link
                key={city}
                to={`/hotels?city=${city}`}
                className="footer-dest-tag"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} StayEase. All rights reserved.
          </p>

          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-dot">·</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="footer-dot">·</span>
            <Link to="/help">Cookie Settings</Link>
          </div>

          <div className="footer-badge">
            <span>🔒</span> Secure booking guaranteed
          </div>
        </div>
      </div>
    </footer>
  );
}
