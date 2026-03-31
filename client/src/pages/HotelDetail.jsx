import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import "./HotelDetail.css";

const AMENITY_ICONS = {
  WiFi: "📶",
  Pool: "🏊",
  Gym: "💪",
  Spa: "🧖",
  Restaurant: "🍽️",
  Parking: "🅿️",
  "Beach Access": "🏖️",
  "Conference Room": "🏢",
  "Multiple Restaurants": "🍴",
  Bar: "🍸",
  "Room Service": "🛎️",
  default: "✦",
};

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  // const [booking, setBooking] = useState(false);
  // const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const carouselRef = useRef(null);

  useEffect(() => {
    Promise.all([
      api.get(`/hotels/${id}`),
      api.get(`/reviews/${id}`).catch(() => ({ data: [] })),
    ])
      .then(([hotelRes, reviewRes]) => {
        setHotel(hotelRes.data);
        setReviews(reviewRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const scroll = (dir) => {
    const imgs = hotel.images?.length || 1;
    setActiveImg((i) => (i + dir + imgs) % imgs);
  };

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000),
        )
      : 1;
  const total = hotel ? hotel.price * nights : 0;

 const handleBook = () => {
  if (!checkIn || !checkOut) return;
  navigate(`/hotels/${id}/guest-details`, {
    state: { checkIn, checkOut, guests, nights, totalPrice: total }
  });
};

  if (loading)
    return (
      <div className="detail-loading">
        <div className="spinner" />
      </div>
    );
  if (!hotel)
    return (
      <div className="detail-loading">
        <p>Hotel not found.</p>
      </div>
    );

  const images = hotel.images?.length
    ? hotel.images
    : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"];

  return (
    <div className="detail-page">
      {/* Image Carousel */}
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="carousel-slide">
              <img src={src} alt={`${hotel.name} ${i + 1}`} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button className="carousel-btn left" onClick={() => scroll(-1)}>
              ‹
            </button>
            <button className="carousel-btn right" onClick={() => scroll(1)}>
              ›
            </button>
            <div className="carousel-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === activeImg ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          </>
        )}
        <div className="carousel-counter">
          {activeImg + 1} / {images.length}
        </div>
      </div>

      <div className="detail-layout">
        {/* Left: main content */}
        <div className="detail-main">
          {/* Header */}
          <div className="detail-header">
            <p className="detail-city">📍 {hotel.city}</p>
            <h1>{hotel.name}</h1>
            <div className="detail-meta">
              <span className="detail-rating">
                ★ {hotel.rating} <span>Excellent</span>
              </span>
              <span className="detail-reviews-count">
                {reviews.length} reviews
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["overview", "amenities", "dining", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="tab-content">
              <h3>About this property</h3>
              <p className="detail-desc">{hotel.description}</p>
              {hotel.extras?.overview && (
                <p className="detail-desc">{hotel.extras.overview}</p>
              )}
            </div>
          )}

          {activeTab === "amenities" && (
            <div className="tab-content">
              <h3>Amenities & Facilities</h3>
              <div className="amenities-grid">
                {hotel.amenities?.map((a) => (
                  <div key={a} className="amenity-item">
                    <span>{AMENITY_ICONS[a] || AMENITY_ICONS.default}</span>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
              {hotel.extras?.spa && (
                <div className="extras-block">
                  <h4>🧖 Spa & Wellness</h4>
                  <p>{hotel.extras.spa}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "dining" && (
            <div className="tab-content">
              <h3>Dining Experience</h3>
              {hotel.extras?.dining ? (
                <>
                  <p className="detail-desc">{hotel.extras.dining}</p>
                  {hotel.extras?.delicacies?.length > 0 && (
                    <div className="delicacies-grid">
                      {hotel.extras.delicacies.map((d, i) => (
                        <div key={i} className="delicacy-card">
                          {d.image && <img src={d.image} alt={d.name} />}
                          <div className="delicacy-info">
                            <h5>{d.name}</h5>
                            <p>{d.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="detail-desc muted">
                  Dining information not yet available.
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-content">
              <h3>Guest Reviews</h3>
              {reviews.length === 0 ? (
                <p className="detail-desc muted">
                  No reviews yet. Be the first!
                </p>
              ) : (
                <div className="reviews-list">
                  {reviews.map((r, i) => (
                    <div key={i} className="review-card">
                      <div className="review-header">
                        <div className="review-avatar">
                          {r.author?.[0] || "G"}
                        </div>
                        <div>
                          <p className="review-author">{r.author || "Guest"}</p>
                          <p className="review-date">
                            {new Date(r.createdAt).toLocaleDateString("en-GB", {
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="review-stars">
                          {"★".repeat(r.rating)}
                          {"☆".repeat(5 - r.rating)}
                        </span>
                      </div>
                      <p className="review-body">{r.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: booking widget */}
        <div className="booking-widget">
          <div className="booking-price">
            <span className="bw-price">₦{hotel.price?.toLocaleString()}</span>
            <span className="bw-per"> / night</span>
          </div>
          <div className="bw-rating">
            ★ {hotel.rating} · {reviews.length} reviews
          </div>

          <div className="bw-fields">
            <div className="bw-field">
              <label>Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="bw-field">
              <label>Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="bw-field full">
              <label>Guests</label>
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(+e.target.value)}
              />
            </div>
          </div>

          {checkIn && checkOut && (
            <div className="bw-summary">
              <div>
                <span>
                  ₦{hotel.price?.toLocaleString()} × {nights} night
                  {nights > 1 ? "s" : ""}
                </span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="bw-total">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          )}

          <button
            className="bw-book-btn"
            onClick={handleBook}
            disabled={!checkIn || !checkOut}
          >
            Reserve Now →
          </button>

          <p className="bw-note">You won't be charged yet</p>
        </div>
      </div>
    </div>
  );
}
