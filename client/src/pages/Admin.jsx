import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Admin.css";

const TABS = ["Hotels", "Add Hotel", "Reviews"];
const emptyHotel = {
  name: "",
  city: "",
  country: "",
  description: "",
  price: "",
  rating: "",
  rooms: "",
  amenities: "",
  images: "",
  "extras.overview": "",
  "extras.spa": "",
  "extras.dining": "",
  "extras.delicacies": "",
};

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Hotels");
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(emptyHotel);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [reviewForm, setReviewForm] = useState({
    hotel: "",
    author: "",
    rating: 5,
    body: "",
  });

useEffect(() => {
  // Wait until AuthContext has finished checking the token
  if (loading) return;

  if (!user) {
    navigate('/login', { replace: true });
    return;
  }

  if (!user.isAdmin) {
    navigate('/', { replace: true });
    return;
  }

  // Only fetch data once we're confirmed admin
  fetchHotels();
  fetchAllReviews();
}, [user, loading]);


  if (loading || !user?.isAdmin) return null;

  const fetchHotels = () => api.get("/hotels").then((r) => setHotels(r.data));

  const fetchAllReviews = () =>
    api
      .get("/reviews/admin/all")
      .then((r) => setReviews(r.data))
      .catch(() => {});

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const buildPayload = () => ({
    name: form.name,
    city: form.city,
    country: form.country,
    description: form.description,
    price: Number(form.price),
    rating: Number(form.rating),
    rooms: Number(form.rooms),
    amenities: form.amenities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    images: form.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    extras: {
      overview: form["extras.overview"],
      spa: form["extras.spa"],
      dining: form["extras.dining"],
      delicacies: form["extras.delicacies"]
        ? form["extras.delicacies"].split("\n").map((line) => {
            const [name, ...rest] = line.split("|");
            return {
              name: name?.trim(),
              description: rest[0]?.trim() || "",
              image: rest[1]?.trim() || "",
            };
          })
        : [],
    },
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) await api.put(`/hotels/${editId}`, buildPayload());
      else await api.post("/hotels", buildPayload());
      setMsg(editId ? "Hotel updated!" : "Hotel added!");
      setForm(emptyHotel);
      setEditId(null);
      fetchHotels();
      setTab("Hotels");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error saving hotel");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (h) => {
    setForm({
      name: h.name,
      city: h.city,
      country: h.country || "",
      description: h.description || "",
      price: h.price,
      rating: h.rating,
      rooms: h.rooms || "",
      amenities: h.amenities?.join(", ") || "",
      images: h.images?.join("\n") || "",
      "extras.overview": h.extras?.overview || "",
      "extras.spa": h.extras?.spa || "",
      "extras.dining": h.extras?.dining || "",
      "extras.delicacies":
        h.extras?.delicacies
          ?.map((d) => `${d.name}|${d.description}|${d.image || ""}`)
          .join("\n") || "",
    });
    setEditId(h._id);
    setTab("Add Hotel");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this hotel?")) return;
    await api.delete(`/hotels/${id}`);
    fetchHotels();
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/reviews", reviewForm);
      setMsg("Review added!");
      setReviewForm({ hotel: "", author: "", rating: 5, body: "" });
      fetchAllReviews();
    } catch (err) {
      setMsg("Error adding review");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm("Delete review?")) return;
    await api.delete(`/reviews/${id}`);
    fetchAllReviews();
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage hotels and reviews</p>
      </div>

      <div className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? "active" : ""}`}
            onClick={() => {
              setTab(t);
              setMsg("");
              setEditId(null);
              if (t !== "Add Hotel") setForm(emptyHotel);
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {msg && (
        <div
          className={`admin-msg ${msg.includes("Error") ? "error" : "success"}`}
        >
          {msg}
        </div>
      )}

      {/* Hotels list */}
      {tab === "Hotels" && (
        <div className="admin-hotels">
          <div className="admin-section-header">
            <span>{hotels.length} hotels</span>
            <button
              className="btn-add"
              onClick={() => {
                setTab("Add Hotel");
                setEditId(null);
                setForm(emptyHotel);
              }}
            >
              + Add New Hotel
            </button>
          </div>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>Name</span>
              <span>City</span>
              <span>Price/night</span>
              <span>Rating</span>
              <span>Actions</span>
            </div>
            {hotels.map((h) => (
              <div key={h._id} className="admin-table-row">
                <span className="admin-hotel-name">
                  {h.images?.[0] && <img src={h.images[0]} alt="" />}
                  {h.name}
                </span>
                <span>{h.city}</span>
                <span>₦{h.price?.toLocaleString()}</span>
                <span>★ {h.rating}</span>
                <span className="admin-actions">
                  <button className="btn-edit" onClick={() => handleEdit(h)}>
                    Edit
                  </button>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(h._id)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit hotel form */}
      {tab === "Add Hotel" && (
        <form className="admin-form" onSubmit={handleSave}>
          <h2>{editId ? "Edit Hotel" : "Add New Hotel"}</h2>
          <div className="admin-form-grid">
            <div className="fg">
              <label>Hotel Name *</label>
              <input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                required
              />
            </div>
            <div className="fg">
              <label>City *</label>
              <input
                value={form.city}
                onChange={(e) => setField("city", e.target.value)}
                required
              />
            </div>
            <div className="fg">
              <label>Country *</label>
              <input
                value={form.country}
                onChange={(e) => setField("country", e.target.value)}
              />
            </div>
            <div className="fg">
              <label>Price per night (₦) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                required
              />
            </div>
            <div className="fg">
              <label>Rating (1–5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) => setField("rating", e.target.value)}
              />
            </div>
            <div className="fg">
              <label>Total Rooms</label>
              <input
                type="number"
                value={form.rooms}
                onChange={(e) => setField("rooms", e.target.value)}
              />
            </div>
          </div>

          <div className="fg full">
            <label>Description *</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              required
            />
          </div>
          <div className="fg full">
            <label>Amenities (comma-separated)</label>
            <input
              placeholder="WiFi, Pool, Gym, Spa, Restaurant"
              value={form.amenities}
              onChange={(e) => setField("amenities", e.target.value)}
            />
          </div>
          <div className="fg full">
            <label>Image URLs (one per line)</label>
            <textarea
              rows="4"
              placeholder="https://images.unsplash.com/..."
              value={form.images}
              onChange={(e) => setField("images", e.target.value)}
            />
          </div>

          <div className="admin-extras-section">
            <h3>Extras & Details</h3>
            <div className="fg full">
              <label>Overview (long description)</label>
              <textarea
                rows="3"
                value={form["extras.overview"]}
                onChange={(e) => setField("extras.overview", e.target.value)}
              />
            </div>
            <div className="fg full">
              <label>Spa & Wellness description</label>
              <textarea
                rows="2"
                value={form["extras.spa"]}
                onChange={(e) => setField("extras.spa", e.target.value)}
              />
            </div>
            <div className="fg full">
              <label>Dining description</label>
              <textarea
                rows="2"
                value={form["extras.dining"]}
                onChange={(e) => setField("extras.dining", e.target.value)}
              />
            </div>
            <div className="fg full">
              <label>
                Delicacies (one per line: Name|Description|ImageURL)
              </label>
              <textarea
                rows="4"
                placeholder="Jollof Rice|Our signature smoky Nigerian jollof|https://..."
                value={form["extras.delicacies"]}
                onChange={(e) => setField("extras.delicacies", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-actions">
            {editId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setEditId(null);
                  setForm(emptyHotel);
                  setTab("Hotels");
                }}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? "Saving..." : editId ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>
        </form>
      )}

      {/* Reviews */}
      {tab === "Reviews" && (
        <div className="admin-reviews">
          <h2>Add Review</h2>
          <form className="review-add-form" onSubmit={handleAddReview}>
            <div className="admin-form-grid">
              <div className="fg">
                <label>Hotel</label>
                <select
                  value={reviewForm.hotel}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, hotel: e.target.value })
                  }
                  required
                >
                  <option value="">Select hotel...</option>
                  {hotels.map((h) => (
                    <option key={h._id} value={h._id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fg">
                <label>Guest Name</label>
                <input
                  value={reviewForm.author}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, author: e.target.value })
                  }
                  required
                />
              </div>
              <div className="fg">
                <label>Rating</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, rating: +e.target.value })
                  }
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} stars
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="fg full">
              <label>Review text</label>
              <textarea
                rows="3"
                value={reviewForm.body}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, body: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? "Adding..." : "Add Review"}
            </button>
          </form>

          <h2 style={{ marginTop: "48px" }}>All Reviews</h2>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>Hotel</span>
              <span>Guest</span>
              <span>Rating</span>
              <span>Review</span>
              <span>Action</span>
            </div>
            {reviews.map((r) => (
              <div key={r._id} className="admin-table-row">
                <span>
                  {r.hotelName ||
                    hotels.find((h) => h._id === r.hotel)?.name ||
                    "—"}
                </span>
                <span>{r.author}</span>
                <span>{"★".repeat(r.rating)}</span>
                <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                  {r.body?.slice(0, 60)}...
                </span>
                <span>
                  <button
                    className="btn-del"
                    onClick={() => handleDeleteReview(r._id)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
