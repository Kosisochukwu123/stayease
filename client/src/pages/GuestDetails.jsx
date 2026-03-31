import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import "./GuestDetails.css";

const ARRIVAL_TIMES = [
  "12:00 – 13:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "15:00 – 16:00",
  "16:00 – 17:00",
  "17:00 – 18:00",
  "18:00 – 19:00",
  "19:00 – 20:00",
  "20:00 – 21:00",
  "21:00 – 22:00",
  "I don't know yet",
];

const TAX_RATE = 0.075; // 7.5% VAT Nigeria
const DAMAGE_DEPOSIT_RATE = 0.15; // 15% of total

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GuestDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Booking data passed from HotelDetail
  const checkIn = state?.checkIn || "";
  const checkOut = state?.checkOut || "";
  const guests = state?.guests || 1;
  const nights = state?.nights || 1;
  const basePrice = state?.totalPrice || 0;

  const tax = Math.round(basePrice * TAX_RATE);
  const damageDeposit = Math.round(basePrice * DAMAGE_DEPOSIT_RATE);
  const grandTotal = basePrice + tax;

  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    country: "Nigeria",
    bookingFor: "myself", // 'myself' | 'someone_else'
    guestName: "",
    travelPurpose: "leisure", // 'leisure' | 'business'
    rentCar: false,
    specialRequest: "",
    arrivalTime: "",
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    api
      .get(`/hotels/${id}`)
      .then((r) => setHotel(r.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (user) {
        await api.post("/bookings", {
          hotel: id,
          checkIn,
          checkOut,
          guests,
          totalPrice: grandTotal,
          guestDetails: form,
        });
      }
      navigate("/booking-confirmation", {
        state: {
          hotel,
          form,
          checkIn,
          checkOut,
          nights,
          guests,
          grandTotal,
          tax,
          damageDeposit,
        },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="gd-loading">
        <div className="gd-spinner" />
      </div>
    );

  if (!hotel)
    return (
      <div className="gd-loading">
        <p>Hotel not found.</p>
      </div>
    );

  const heroImg =
    hotel.images?.[0] ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600";

  return (
    <div className="gd-page">
      {/* Breadcrumb */}
      <div className="gd-breadcrumb">
        <span onClick={() => navigate(-1)} className="gd-back">
          ← Back to hotel
        </span>
        <div className="gd-steps">
          <span className="gd-step done">1. Your selection</span>
          <span className="gd-step-arrow">›</span>
          <span className="gd-step active">2. Your details</span>
          <span className="gd-step-arrow">›</span>
          <span className="gd-step">3. Confirmation</span>
        </div>
      </div>

      <div className="gd-layout">
        {/* ── LEFT: FORM ── */}
        <div className="gd-left">
          {/* Property snapshot */}
          <div className="gd-property-card">
            <img src={heroImg} alt={hotel.name} className="gd-property-img" />
            <div className="gd-property-info">
              <p className="gd-property-city">
                📍 {hotel.city}
                {hotel.country ? `, ${hotel.country}` : ""}
              </p>
              <h2 className="gd-property-name">{hotel.name}</h2>
              <div className="gd-property-rating">
                <span className="gd-stars">★ {hotel.rating}</span>
                <span className="gd-label-excellent">Excellent</span>
              </div>
              {hotel.amenities?.slice(0, 4).map((a) => (
                <span key={a} className="gd-amenity-pill">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Things to experience */}
          {(hotel.extras?.overview ||
            hotel.extras?.spa ||
            hotel.extras?.dining) && (
            <div className="gd-section">
              <h3 className="gd-section-title">✦ What awaits you</h3>
              <div className="gd-experiences">
                {hotel.extras?.spa && (
                  <div className="gd-experience-item">
                    <span className="gd-exp-icon">🧖</span>
                    <div>
                      <h5>Spa & Wellness</h5>
                      <p>
                        {hotel.extras.spa.slice(0, 100)}
                        {hotel.extras.spa.length > 100 ? "..." : ""}
                      </p>
                    </div>
                  </div>
                )}
                {hotel.extras?.dining && (
                  <div className="gd-experience-item">
                    <span className="gd-exp-icon">🍽️</span>
                    <div>
                      <h5>Dining</h5>
                      <p>
                        {hotel.extras.dining.slice(0, 100)}
                        {hotel.extras.dining.length > 100 ? "..." : ""}
                      </p>
                    </div>
                  </div>
                )}
                {hotel.amenities?.includes("Pool") && (
                  <div className="gd-experience-item">
                    <span className="gd-exp-icon">🏊</span>
                    <div>
                      <h5>Swimming Pool</h5>
                      <p>
                        Enjoy our temperature-controlled outdoor pool, open
                        daily.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── GUEST DETAILS FORM ── */}
          <form onSubmit={handleSubmit}>
            {/* 1. Enter your details */}
            <div className="gd-section">
              <h3 className="gd-section-title">1. Enter your details</h3>
              <p className="gd-section-sub">
                We'll use this to send your booking confirmation.
              </p>

              <div className="gd-form-row">
                <div className="gd-field">
                  <label>
                    First name <span className="req">*</span>
                  </label>
                  <input
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="gd-field">
                  <label>
                    Last name <span className="req">*</span>
                  </label>
                  <input
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="gd-form-row">
                <div className="gd-field">
                  <label>
                    Email address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    required
                  />
                </div>
                <div className="gd-field">
                  <label>
                    Phone number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="gd-field">
                <label>Country / Region</label>
                <select
                  value={form.country}
                  onChange={(e) => setField("country", e.target.value)}
                >
                  {[
                    "Nigeria",
                    "Ghana",
                    "Kenya",
                    "South Africa",
                    "United Kingdom",
                    "United States",
                    "Canada",
                    "Germany",
                    "France",
                    "Other",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Who are you booking for? */}
            <div className="gd-section">
              <h3 className="gd-section-title">2. Who are you booking for?</h3>
              <div className="gd-radio-group">
                <label
                  className={`gd-radio-card ${form.bookingFor === "myself" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="bookingFor"
                    value="myself"
                    checked={form.bookingFor === "myself"}
                    onChange={() => setField("bookingFor", "myself")}
                  />
                  <div className="gd-radio-content">
                    <span className="gd-radio-icon">👤</span>
                    <div>
                      <strong>I'm the main guest</strong>
                      <p>I'll be staying at the property</p>
                    </div>
                  </div>
                </label>
                <label
                  className={`gd-radio-card ${form.bookingFor === "someone_else" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="bookingFor"
                    value="someone_else"
                    checked={form.bookingFor === "someone_else"}
                    onChange={() => setField("bookingFor", "someone_else")}
                  />
                  <div className="gd-radio-content">
                    <span className="gd-radio-icon">👥</span>
                    <div>
                      <strong>Booking for someone else</strong>
                      <p>I won't be staying at the property</p>
                    </div>
                  </div>
                </label>
              </div>
              {form.bookingFor === "someone_else" && (
                <div className="gd-field gd-slide-in">
                  <label>
                    Guest's full name <span className="req">*</span>
                  </label>
                  <input
                    placeholder="Name of the person staying"
                    value={form.guestName}
                    onChange={(e) => setField("guestName", e.target.value)}
                    required={form.bookingFor === "someone_else"}
                  />
                </div>
              )}
            </div>

            {/* 3. Purpose of travel */}
            <div className="gd-section">
              <h3 className="gd-section-title">
                3. Are you travelling for work?
              </h3>
              <div className="gd-checkbox-row">
                <label className="gd-checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.travelPurpose === "business"}
                    onChange={(e) =>
                      setField(
                        "travelPurpose",
                        e.target.checked ? "business" : "leisure",
                      )
                    }
                  />
                  <span className="gd-checkmark" />
                  Yes, I'm travelling for business
                </label>
              </div>
              {form.travelPurpose === "business" && (
                <div className="gd-info-note gd-slide-in">
                  <span>💼</span> Business travel rates and invoice options may
                  be available at check-in.
                </div>
              )}
            </div>

            {/* 4. Rent a car */}
            <div className="gd-section">
              <h3 className="gd-section-title">
                4. Add a rental car to your trip?
              </h3>
              <p className="gd-section-sub">
                Pick up a car at the property or nearby airport.
              </p>
              <div className="gd-checkbox-row">
                <label className="gd-checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.rentCar}
                    onChange={(e) => setField("rentCar", e.target.checked)}
                  />
                  <span className="gd-checkmark" />
                  Yes, I'm interested in renting a car
                </label>
              </div>
              {form.rentCar && (
                <div className="gd-info-note gd-slide-in">
                  <span>🚗</span> Our team will contact you with available car
                  rental options for your dates.
                </div>
              )}
            </div>

            {/* 5. Special requests */}
            <div className="gd-section">
              <h3 className="gd-section-title">5. Any special requests?</h3>
              <p className="gd-section-sub">
                Special requests can't be guaranteed, but the property will do
                its best to meet your needs.
              </p>
              <textarea
                className="gd-textarea"
                rows="4"
                placeholder="e.g. Late check-in, high floor, twin beds, anniversary decoration..."
                value={form.specialRequest}
                onChange={(e) => setField("specialRequest", e.target.value)}
              />
            </div>

            {/* 6. Arrival time */}
            <div className="gd-section">
              <h3 className="gd-section-title">
                6. Your estimated arrival time
              </h3>
              <div className="gd-arrival-info">
                <div className="gd-arrival-row">
                  <span className="gd-arrival-label">🕐 Check-in from</span>
                  <strong>14:00</strong>
                </div>
                <div className="gd-arrival-row">
                  <span className="gd-arrival-label">🕙 Check-out before</span>
                  <strong>12:00</strong>
                </div>
              </div>
              <div className="gd-field">
                <label>Add your estimated arrival time</label>
                <select
                  value={form.arrivalTime}
                  onChange={(e) => setField("arrivalTime", e.target.value)}
                >
                  <option value="">Please select…</option>
                  {ARRIVAL_TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <p className="gd-arrival-note">
                Front desk staff will be available to welcome you at your
                selected time.
              </p>
            </div>

            <button
              type="submit"
              className="gd-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Complete Reservation →"}
            </button>
            <p className="gd-submit-note">
              You won't be charged yet · Free cancellation available
            </p>
          </form>
        </div>

        {/* ── RIGHT: BOOKING SUMMARY ── */}
        <div className="gd-right">
          <div className="gd-summary-card">
            <h3 className="gd-summary-title">Your booking summary</h3>

            {/* Dates */}
            <div className="gd-summary-dates">
              <div className="gd-date-block">
                <label>Check-in</label>
                <strong>{formatDate(checkIn)}</strong>
                <span>From 14:00</span>
              </div>
              <div className="gd-dates-divider">
                <span>{nights}</span>
                <small>night{nights !== 1 ? "s" : ""}</small>
              </div>
              <div className="gd-date-block">
                <label>Check-out</label>
                <strong>{formatDate(checkOut)}</strong>
                <span>Until 12:00</span>
              </div>
            </div>

            <div className="gd-summary-row guests-row">
              <span>👥 Guests</span>
              <strong>
                {guests} guest{guests > 1 ? "s" : ""}
              </strong>
            </div>

            {/* Price breakdown */}
            <div className="gd-summary-divider" />
            <h4 className="gd-price-title">Price information</h4>

            <div className="gd-price-rows">
              <div className="gd-price-row">
                <span>
                  ₦{hotel.price?.toLocaleString()} × {nights} night
                  {nights !== 1 ? "s" : ""}
                </span>
                <span>₦{basePrice?.toLocaleString()}</span>
              </div>
              <div className="gd-price-row">
                <span>VAT (7.5%)</span>
                <span>₦{tax?.toLocaleString()}</span>
              </div>
              <div className="gd-price-row total-row">
                <strong>Total price</strong>
                <strong>₦{grandTotal?.toLocaleString()}</strong>
              </div>
            </div>

            {/* Damage deposit box */}
            <div className="gd-deposit-box">
              <div className="gd-deposit-header">
                <span className="gd-deposit-icon">🛡️</span>
                <div>
                  <h5>Damage deposit</h5>
                  <span className="gd-deposit-badge">Fully refundable</span>
                </div>
                <strong>₦{damageDeposit?.toLocaleString()}</strong>
              </div>
              <p className="gd-deposit-note">
                A refundable damage deposit of ₦
                {damageDeposit?.toLocaleString()} is held at check-in and fully
                returned within 5 business days after check-out, provided no
                damage has occurred.
              </p>
            </div>

            {/* Tax note */}
            <div className="gd-tax-note">
              <span>✓</span> All taxes and fees included in the total price
            </div>

            {/* Policies */}
            <div className="gd-summary-divider" />
            <div className="gd-policies">
              <div className="gd-policy">
                <span className="gd-policy-icon green">✓</span>
                <span>Free cancellation before check-in</span>
              </div>
              <div className="gd-policy">
                <span className="gd-policy-icon green">✓</span>
                <span>No prepayment needed — pay at the property</span>
              </div>
              <div className="gd-policy">
                <span className="gd-policy-icon">ℹ</span>
                <span>Damage deposit collected at check-in</span>
              </div>
            </div>
          </div>

          {/* Need help */}
          <div className="gd-help-box">
            <span>💬</span>
            <div>
              <strong>Need help?</strong>
              <p>Our support team is available 24/7</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
