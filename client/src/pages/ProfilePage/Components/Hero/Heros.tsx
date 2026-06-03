import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaEdit, FaSave, FaTimes,
  FaLeaf, FaBoxOpen, FaStar, FaMoneyBillWave,
  FaShoppingBag, FaCog, FaInfoCircle,
} from "react-icons/fa";
import defaultAvatar from "../../../../assets/default-user.png";
import "../Hero/Heros.css";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  location: string;
}

interface Listing {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  emoji: string;
  bg: string;
}

const MOCK_LISTINGS: Listing[] = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", price: 120, unit: "kg", emoji: "🍅", bg: "#fff0f0" },
  { id: 2, name: "Sukuma Wiki", category: "Vegetables", price: 60, unit: "bunch", emoji: "🥬", bg: "#f0faf0" },
  { id: 3, name: "Bananas", category: "Fruits", price: 80, unit: "kg", emoji: "🍌", bg: "#fffde7" },
  { id: 4, name: "Fresh Eggs", category: "Livestock", price: 15, unit: "piece", emoji: "🥚", bg: "#fff8f0" },
];

const TABS = ["overview", "products", "orders", "settings"] as const;
type Tab = typeof TABS[number];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [form, setForm] = useState({ full_name: "", phone: "", location: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleEditClick = () => {
    if (!user) return;
    setForm({ full_name: user.full_name, phone: user.phone, location: user.location });
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully");
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const STATS = [
    { icon: <FaLeaf />, label: "Products listed", value: "12", color: "#E8F5E9", iconColor: "#2E7D32" },
    { icon: <FaBoxOpen />, label: "Orders completed", value: "47", color: "#E3F2FD", iconColor: "#1565C0" },
    { icon: <FaStar />, label: "Customer rating", value: "4.8 ⭐", color: "#FFF8E1", iconColor: "#F9A825" },
    { icon: <FaMoneyBillWave />, label: "Total earnings", value: "320K FCFA", color: "#F3E5F5", iconColor: "#6A1B9A" },
  ];

  return (
    <div className="pr-page">

      {/* HERO BANNER */}
      <div className="pr-hero">
        <div className="pr-hero-overlay" />
        <div className="pr-hero-content">
          <h1>My Profile</h1>
          <nav className="pr-breadcrumb">
            <span onClick={() => navigate("/landing")}>Home</span>
            <span>&rsaquo;</span>
            <span className="pr-active">Profile</span>
          </nav>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="pr-container">
        <div className="pr-main-card">
          <div className="pr-profile-top">
            <div className="pr-avatar-wrap">
              <img src={defaultAvatar} alt="avatar" className="pr-avatar" />
              <div className="pr-avatar-edit" title="Change photo">
                <FaEdit size={10} />
              </div>
            </div>
            <div className="pr-identity">
              {!editMode ? (
                <>
                  <div className="pr-name-row">
                    <h2>{user?.full_name || "John Doe"}</h2>
                    <span className="pr-verified-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#2E7D32"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Verified Farmer
                    </span>
                  </div>
                  <div className="pr-meta">
                    <span><FaMapMarkerAlt size={11} /> {user?.location || "Nairobi, Kenya"}</span>
                    <span><FaPhone size={11} /> {user?.phone || "+254 700 000 000"}</span>
                    <span><FaEnvelope size={11} /> {user?.email || "john@example.com"}</span>
                  </div>
                  <p className="pr-bio">Passionate farmer dedicated to sustainable agriculture and providing fresh quality produce.</p>
                </>
              ) : (
                <div className="pr-edit-form">
                  <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Full name" />
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
                  <div className="pr-edit-btns">
                    <button className="pr-save-btn" onClick={handleSave}><FaSave size={12} /> Save</button>
                    <button className="pr-discard-btn" onClick={() => setEditMode(false)}><FaTimes size={12} /> Cancel</button>
                  </div>
                </div>
              )}
            </div>
            {!editMode && (
              <button className="pr-edit-btn" onClick={handleEditClick}>
                <FaEdit size={12} /> Edit profile
              </button>
            )}
          </div>

          {/* INFO + STATS GRID */}
          <div className="pr-info-stats-grid">
            <div className="pr-info-box">
              <h3>My information</h3>
              {[
                { icon: <FaUser size={12} />, label: "Full name", val: user?.full_name || "John Doe" },
                { icon: <FaEnvelope size={12} />, label: "Email", val: user?.email || "john@example.com" },
                { icon: <FaPhone size={12} />, label: "Phone", val: user?.phone || "+254 700 000 000" },
                { icon: <FaMapMarkerAlt size={12} />, label: "Location", val: user?.location || "Nairobi, Kenya" },
                { icon: <FaCalendarAlt size={12} />, label: "Member since", val: "May 2025" },
              ].map((row) => (
                <div className="pr-info-row" key={row.label}>
                  <span className="pr-info-label">{row.icon} {row.label}</span>
                  <span className="pr-info-val">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="pr-stats-box">
              <h3>Account stats</h3>
              {STATS.map((s) => (
                <div className="pr-stat-row" key={s.label}>
                  <span className="pr-stat-left">
                    <span className="pr-stat-icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</span>
                    {s.label}
                  </span>
                  <span className="pr-stat-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="pr-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`pr-tab-btn ${activeTab === tab ? "pr-tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "overview" && <FaInfoCircle size={13} />}
              {tab === "products" && <FaLeaf size={13} />}
              {tab === "orders" && <FaShoppingBag size={13} />}
              {tab === "settings" && <FaCog size={13} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="pr-tab-content">
          {activeTab === "overview" && (
            <div className="pr-overview-grid">
              <div className="pr-content-box">
                <h3>About me</h3>
                <p>Passionate farmer with experience in crop production. We grow fresh and organic products for local markets, prioritising sustainability and community support.</p>
              </div>
              <div className="pr-content-box">
                <h3>Earnings overview</h3>
                <div className="pr-earnings-bars">
                  {[
                    { month: "Jan", pct: 55 }, { month: "Feb", pct: 70 },
                    { month: "Mar", pct: 45 }, { month: "Apr", pct: 90 },
                    { month: "May", pct: 65 }, { month: "Jun", pct: 80 },
                  ].map((b) => (
                    <div className="pr-bar-wrap" key={b.month}>
                      <div className="pr-bar" style={{ height: `${b.pct}%` }} />
                      <span>{b.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="pr-section-header">
                <h3>My listings</h3>
                <button className="pr-add-btn" onClick={() => navigate("/upload")}>+ Add product</button>
              </div>
              <div className="pr-listings-grid">
                {MOCK_LISTINGS.map((item) => (
                  <div className="pr-listing-card" key={item.id}>
                    <div className="pr-listing-emoji" style={{ background: item.bg }}>{item.emoji}</div>
                    <div className="pr-listing-info">
                      <span className="pr-listing-name">{item.name}</span>
                      <span className="pr-listing-cat">{item.category}</span>
                      <span className="pr-listing-price">KSh {item.price} / {item.unit}</span>
                      <span className="pr-active-badge">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="pr-content-box">
              <h3>Recent orders</h3>
              <table className="pr-orders-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tomatoes</td><td>20 kg</td><td>12,000 FCFA</td>
                    <td><span className="pr-status-delivered">Delivered</span></td>
                  </tr>
                  <tr>
                    <td>Maize</td><td>10 kg</td><td>5,000 FCFA</td>
                    <td><span className="pr-status-processing">Processing</span></td>
                  </tr>
                  <tr>
                    <td>Fresh Eggs</td><td>30 pieces</td><td>4,500 FCFA</td>
                    <td><span className="pr-status-delivered">Delivered</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="pr-overview-grid">
              <div className="pr-content-box">
                <h3>Account settings</h3>
                <p style={{ color: "#888", fontSize: "13px" }}>Manage your notifications, password, and privacy settings here.</p>
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {["Change password", "Notification preferences", "Privacy settings", "Delete account"].map((opt) => (
                    <button key={opt} className="pr-settings-row">{opt}</button>
                  ))}
                </div>
              </div>
              <div className="pr-content-box">
                <h3>Verification</h3>
                <p style={{ color: "#888", fontSize: "13px" }}>Verify your identity to unlock full marketplace features.</p>
                <button className="pr-verify-btn">Start verification</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
