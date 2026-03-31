import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "./Attractions.css";

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CATEGORY_ICONS = {
  tourism: "🏛️",
  historic: "🏰",
  museum: "🖼️",
  park: "🌿",
  restaurant: "🍽️",
  hotel: "🏨",
  beach: "🏖️",
  market: "🛍️",
  mosque: "🕌",
  church: "⛪",
  stadium: "🏟️",
  zoo: "🦁",
  gallery: "🎨",
  theatre: "🎭",
  default: "📍",
};

const COUNTRIES = [
  {
    name: "Nigeria",
    flag: "🇳🇬",
    cover: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7e09?w=800",
    description:
      "West Africa's most vibrant nation — ancient empires, endless beaches, and electric cities.",
    cities: [
      {
        name: "Lagos",
        lat: 6.5244,
        lng: 3.3792,
        zoom: 13,
        description: "Nigeria's commercial capital and Africa's largest city.",
      },
      {
        name: "Abuja",
        lat: 9.0579,
        lng: 7.4951,
        zoom: 13,
        description:
          "Nigeria's planned federal capital with modern architecture.",
      },
      {
        name: "Kano",
        lat: 12.0022,
        lng: 8.592,
        zoom: 13,
        description:
          "Ancient Hausa city and Nigeria's northern commercial hub.",
      },
      {
        name: "Port Harcourt",
        lat: 4.8156,
        lng: 7.0498,
        zoom: 13,
        description:
          "The Garden City — Nigeria's oil capital on the Niger Delta.",
      },
      {
        name: "Ibadan",
        lat: 7.3775,
        lng: 3.947,
        zoom: 13,
        description:
          "One of Africa's largest cities by area, rich in Yoruba culture.",
      },
      {
        name: "Enugu",
        lat: 6.4584,
        lng: 7.5464,
        zoom: 13,
        description:
          "The Coal City — gateway to Southeast Nigeria's highlands.",
      },
    ],
  },
  {
    name: "Ghana",
    flag: "🇬🇭",
    cover: "https://images.unsplash.com/photo-1589825743320-fe7a82370fc6?w=800",
    description:
      "The Gateway to Africa — historic forts, warm beaches, and legendary hospitality.",
    cities: [
      {
        name: "Accra",
        lat: 5.6037,
        lng: -0.187,
        zoom: 13,
        description:
          "A buzzing cosmopolitan capital with great food and nightlife.",
      },
      {
        name: "Cape Coast",
        lat: 5.1053,
        lng: -1.2466,
        zoom: 13,
        description:
          "Historic slave trade forts and pristine Atlantic beaches.",
      },
      {
        name: "Kumasi",
        lat: 6.6885,
        lng: -1.6244,
        zoom: 13,
        description: "Cultural capital of the Ashanti Kingdom.",
      },
    ],
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    cover: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b8?w=800",
    description:
      "Safari paradise — from the Maasai Mara to the Indian Ocean coast.",
    cities: [
      {
        name: "Nairobi",
        lat: -1.2921,
        lng: 36.8219,
        zoom: 13,
        description:
          "East Africa's most cosmopolitan city with world-class dining.",
      },
      {
        name: "Mombasa",
        lat: -4.0435,
        lng: 39.6682,
        zoom: 13,
        description: "Ancient Swahili port city on Kenya's Indian Ocean coast.",
      },
      {
        name: "Kisumu",
        lat: -0.0917,
        lng: 34.7679,
        zoom: 13,
        description: "Lakeside city on the shores of Lake Victoria.",
      },
    ],
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    cover: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
    description:
      "The Rainbow Nation — Cape winelands, Kruger wildlife, and vibrant urban culture.",
    cities: [
      {
        name: "Cape Town",
        lat: -33.9249,
        lng: 18.4241,
        zoom: 13,
        description:
          "One of the world's most beautiful cities, beneath Table Mountain.",
      },
      {
        name: "Johannesburg",
        lat: -26.2041,
        lng: 28.0473,
        zoom: 12,
        description: "Africa's economic powerhouse — art, food, and culture.",
      },
      {
        name: "Durban",
        lat: -29.8587,
        lng: 31.0218,
        zoom: 13,
        description:
          "Warm Indian Ocean beaches and South Africa's spiciest food.",
      },
    ],
  },
  {
    name: "Egypt",
    flag: "🇪🇬",
    cover: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800",
    description:
      "The cradle of civilisation — pyramids, pharaohs, and the eternal Nile.",
    cities: [
      {
        name: "Cairo",
        lat: 30.0444,
        lng: 31.2357,
        zoom: 13,
        description:
          "Ancient metropolis where the pyramids meet the modern world.",
      },
      {
        name: "Luxor",
        lat: 25.6872,
        lng: 32.6396,
        zoom: 13,
        description: "The world's greatest open-air museum of ancient Egypt.",
      },
      {
        name: "Alexandria",
        lat: 31.2001,
        lng: 29.9187,
        zoom: 13,
        description: "Mediterranean port city founded by Alexander the Great.",
      },
    ],
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    cover: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800",
    description:
      "Where Africa meets Arabia — ancient medinas, Saharan dunes, and Atlantic coastline.",
    cities: [
      {
        name: "Marrakech",
        lat: 31.6295,
        lng: -7.9811,
        zoom: 14,
        description:
          "The Red City — ancient souks, riads, and the famous Djemaa el-Fna.",
      },
      {
        name: "Casablanca",
        lat: 33.5731,
        lng: -7.5898,
        zoom: 13,
        description:
          "Morocco's modern commercial capital on the Atlantic coast.",
      },
      {
        name: "Fez",
        lat: 34.0181,
        lng: -5.0078,
        zoom: 14,
        description:
          "Home to the world's oldest university and medieval medina.",
      },
    ],
  },
];

// Overpass API query to fetch tourist attractions
async function fetchAttractions(lat, lng, radius = 3000) {
  const query = `
    [out:json][timeout:25];
    (
      node["tourism"~"attraction|museum|artwork|viewpoint|theme_park|zoo|aquarium"](around:${radius},${lat},${lng});
      node["historic"~"monument|memorial|castle|ruins|archaeological_site|building"](around:${radius},${lat},${lng});
      node["leisure"~"park|beach_resort|nature_reserve|garden"](around:${radius},${lat},${lng});
      node["amenity"~"theatre|cinema|arts_centre|place_of_worship|marketplace"](around:${radius},${lat},${lng});
    );
    out body 40;
  `;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: "data=" + encodeURIComponent(query),
  });
  const data = await res.json();
  return data.elements.filter((el) => el.tags?.name);
}

function getCategory(tags) {
  if (tags.tourism) return tags.tourism;
  if (tags.historic) return tags.historic;
  if (tags.leisure) return tags.leisure;
  if (tags.amenity) return tags.amenity;
  return "default";
}

function getIcon(tags) {
  const cat = getCategory(tags);
  return CATEGORY_ICONS[cat] || CATEGORY_ICONS.default;
}

// Component to fly map to new location
function FlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.4 });
  }, [center, zoom]);
  return null;
}

// Custom coloured marker
function colorMarker(color = "#c4612a") {
  return L.divIcon({
    html: `<div style="
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      background:${color};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      transform:rotate(-45deg);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    className: "",
  });
}

export default function Attractions() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mapCenter, setMapCenter] = useState([9.082, 8.6753]); // Nigeria center
  const [mapZoom, setMapZoom] = useState(6);

  const handleCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    setAttractions([]);
    setActiveFilter("all");
  };

  const handleCity = useCallback(async (city) => {
    setSelectedCity(city);
    setMapCenter([city.lat, city.lng]);
    setMapZoom(city.zoom);
    setAttractions([]);
    setLoadingAttractions(true);
    try {
      const data = await fetchAttractions(city.lat, city.lng);
      setAttractions(data);
    } catch (e) {
      setAttractions([]);
    } finally {
      setLoadingAttractions(false);
    }
  }, []);

  const categories = [
    "all",
    ...new Set(attractions.map((a) => getCategory(a.tags))),
  ];

  const filtered =
    activeFilter === "all"
      ? attractions
      : attractions.filter((a) => getCategory(a.tags) === activeFilter);

  return (
    <div className="attr-page">
      {/* Hero banner */}
      <div className="attr-hero">
        <div className="attr-hero-content">
          <p className="attr-eyebrow">Explore the continent</p>
          <h1>Attractions & Experiences</h1>
          <p className="attr-hero-sub">
            Discover what to do, see, and experience at every destination —
            powered by live OpenStreetMap data.
          </p>
        </div>
      </div>

      {/* Country grid */}
      {!selectedCountry && (
        <section className="attr-section">
          <div className="attr-section-header">
            <h2>Choose a country</h2>
            <p>Select a destination to explore its cities and attractions</p>
          </div>
          <div className="attr-countries-grid">
            {COUNTRIES.map((c) => (
              <div
                key={c.name}
                className="attr-country-card"
                onClick={() => handleCountry(c)}
              >
                <div className="attr-country-img">
                  <img src={c.cover} alt={c.name} />
                  <div className="attr-country-overlay" />
                </div>
                <div className="attr-country-info">
                  <span className="attr-flag">{c.flag}</span>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <span className="attr-cities-count">
                    {c.cities.length} cities →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Country detail — city list + map */}
      {selectedCountry && (
        <div className="attr-detail">
          {/* Back + breadcrumb */}
          <div className="attr-breadcrumb">
            <button
              className="attr-back"
              onClick={() => {
                setSelectedCountry(null);
                setSelectedCity(null);
                setAttractions([]);
              }}
            >
              ← All countries
            </button>
            <span className="attr-bread-sep">›</span>
            <span>
              {selectedCountry.flag} {selectedCountry.name}
            </span>
            {selectedCity && (
              <>
                <span className="attr-bread-sep">›</span>
                <span>{selectedCity.name}</span>
              </>
            )}
          </div>

          <div className="attr-layout">
            {/* Left panel */}
            <div className="attr-left">
              <div className="attr-country-hero">
                <img src={selectedCountry.cover} alt={selectedCountry.name} />
                <div className="attr-country-hero-info">
                  <span>{selectedCountry.flag}</span>
                  <h2>{selectedCountry.name}</h2>
                  <p>{selectedCountry.description}</p>
                </div>
              </div>

              {/* City pills */}
              <div className="attr-cities-section">
                <h4>Select a city</h4>
                <div className="attr-city-pills">
                  {selectedCountry.cities.map((city) => (
                    <button
                      key={city.name}
                      className={`attr-city-pill ${selectedCity?.name === city.name ? "active" : ""}`}
                      onClick={() => handleCity(city)}
                    >
                      📍 {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* City description */}
              {selectedCity && (
                <div className="attr-city-desc">
                  <h3>{selectedCity.name}</h3>
                  <p>{selectedCity.description}</p>
                </div>
              )}

              {/* Attractions list */}
              {selectedCity && (
                <div className="attr-attractions-panel">
                  <div className="attr-panel-header">
                    <h4>
                      {loadingAttractions
                        ? "Loading attractions..."
                        : `${filtered.length} attractions found`}
                    </h4>
                    {!loadingAttractions && attractions.length > 0 && (
                      <div className="attr-filters">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            className={`attr-filter-btn ${activeFilter === cat ? "active" : ""}`}
                            onClick={() => setActiveFilter(cat)}
                          >
                            {cat === "all" ? "All" : cat.replace(/_/g, " ")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {loadingAttractions && (
                    <div className="attr-loading">
                      <div className="attr-spinner" />
                      <p>Fetching live attraction data...</p>
                    </div>
                  )}

                  {!loadingAttractions && filtered.length === 0 && (
                    <div className="attr-empty">
                      <span>🗺️</span>
                      <p>
                        No named attractions found in this area via
                        OpenStreetMap. Try a nearby city!
                      </p>
                    </div>
                  )}

                  <div className="attr-list">
                    {filtered.map((a, i) => (
                      <div key={i} className="attr-item">
                        <div className="attr-item-icon">{getIcon(a.tags)}</div>
                        <div className="attr-item-info">
                          <h5>{a.tags.name}</h5>
                          <p>
                            {[
                              a.tags.tourism,
                              a.tags.historic,
                              a.tags.leisure,
                              a.tags.amenity,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                          {a.tags.opening_hours && (
                            <span className="attr-hours">
                              🕐 {a.tags.opening_hours}
                            </span>
                          )}
                          {a.tags.website && (
                            <a
                              href={a.tags.website}
                              target="_blank"
                              rel="noreferrer"
                              className="attr-link"
                            >
                              Website →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Map */}
            <div className="attr-map-wrapper">
              <div className="attr-map-sticky">
                {!selectedCity && (
                  <div className="attr-map-hint">
                    <span>👆</span>
                    <p>Select a city to see its attractions on the map</p>
                  </div>
                )}
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FlyTo center={mapCenter} zoom={mapZoom} />

                  {/* City centre marker */}
                  {selectedCity && (
                    <Marker
                      position={[selectedCity.lat, selectedCity.lng]}
                      icon={colorMarker("#c4612a")}
                    >
                      <Popup>
                        <strong>{selectedCity.name}</strong>
                        <br />
                        {selectedCity.description}
                      </Popup>
                    </Marker>
                  )}

                  {/* Attraction markers */}
                  {filtered.map((a, i) => (
                    <Marker
                      key={i}
                      position={[a.lat, a.lon]}
                      icon={colorMarker("#3d2b1f")}
                    >
                      <Popup>
                        <div style={{ maxWidth: 180 }}>
                          <strong>
                            {getIcon(a.tags)} {a.tags.name}
                          </strong>
                          {a.tags.tourism && (
                            <p
                              style={{
                                margin: "4px 0 0",
                                fontSize: 12,
                                color: "#8a7060",
                              }}
                            >
                              {a.tags.tourism}
                            </p>
                          )}
                          {a.tags.opening_hours && (
                            <p style={{ margin: "4px 0 0", fontSize: 11 }}>
                              🕐 {a.tags.opening_hours}
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
