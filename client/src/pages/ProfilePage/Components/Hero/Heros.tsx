import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../../../utils/constants";
import type { User } from "../../../../types/User";
import type { Product } from "../../../../types/Product";
import { formatMemberSince } from "../../../../utils/formatDate";
import { useAuth } from "../../../../context/AuthContext";

import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaEdit, FaSave, FaTimes,
  FaLeaf, FaBoxOpen, FaStar, FaMoneyBillWave,
  FaShoppingBag, FaCog, FaInfoCircle,
  FaCamera, FaLock, FaBell, FaShieldAlt,
  FaTrash, FaSignOutAlt, FaEye, FaEyeSlash,
  FaToggleOn, FaToggleOff,
} from "react-icons/fa";

import {
  updateProfile,
  uploadAvatar,
  changePassword,
  saveNotifications,
  deleteAccount,
} from "../../../../services/userService";

import { useProfile } from "../../../../hooks/Userprofile";

import "../Hero/Heros.css";

/* ─── TYPES ─── */
interface Order {
  id: number;
  product_name: string;
  quantity: number;
  unit: string;
  total_amount: number;
  status: "delivered" | "processing" | "cancelled" | "pending";
  created_at: string;
}

const TABS = ["overview", "products", "orders", "settings"] as const;
type Tab = typeof TABS[number];

/* ─── COMPONENT ─── */
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  /* ── AUTH ── */
  const { token, updateUser, logout } = useAuth();

  /* ── PROFILE HOOK ── */
  const {
    user,
    setUser,
    stats,
    products,
    orders,
    loading,
    avatar,
    updateAvatar,
  } = useProfile();

  /* ── UI STATE ── */
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [form, setForm] = useState({ full_name: "", phone: "", location: "" });

  /* SETTINGS STATE */
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwLoading, setPwLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true, promotions: false, newsletter: true, sms: false,
  });
  const [deleteConfirm, setDeleteConfirm] = useState("");

  /* ── AVATAR UPLOAD ── */
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const reader = new FileReader();
    reader.onload = () => updateAvatar(reader.result as string);
    reader.readAsDataURL(file);

    try {
      setAvatarLoading(true);
      const res = await uploadAvatar(token, file);
      const updatedImage: string = res.profile_image;

      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, profile_image: updatedImage };
        setTimeout(() => updateUser(updated), 0);
        return updated;
      });
      updateAvatar(`${API_BASE}${updatedImage}`);
    } catch {
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setAvatarLoading(false);
    }
  };

  /* ── EDIT PROFILE ── */
  const handleEditClick = () => {
    if (!user) return;
    setForm({ full_name: user.full_name, phone: user.phone, location: user.location });
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!token || !user) return;
    if (!form.full_name || !form.phone) {
      alert("Name and phone are required.");
      return;
    }
    try {
      const res = await updateProfile(token, form);
      const updated: User = { ...user, ...res };
      setUser(updated);
      updateUser(updated);
      setEditMode(false);
    } catch {
      alert("Failed to update profile.");
    }
  };

  /* ── CHANGE PASSWORD ── */
  const handleChangePassword = async () => {
    if (!token) return;
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
      alert("Please fill all password fields.");
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      alert("New passwords do not match.");
      return;
    }
    if (pwForm.newPw.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    try {
      setPwLoading(true);
      await changePassword(token, {
        current_password: pwForm.current,
        new_password: pwForm.newPw,
      });
      alert("Password changed successfully!");
      setPwForm({ current: "", newPw: "", confirm: "" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to change password.");
    } finally {
      setPwLoading(false);
    }
  };

  /* ── SAVE NOTIFICATIONS ── */
  const handleSaveNotifications = async () => {
    if (!token) return;
    try {
      await saveNotifications(token, notifications);
      alert("Notification preferences saved!");
    } catch {
      alert("Failed to save preferences.");
    }
  };

  /* ── DELETE ACCOUNT ── */
  const handleDeleteAccount = async () => {
    if (!token || !user) return;
    if (deleteConfirm !== user.email) {
      alert("Please type your email exactly to confirm deletion.");
      return;
    }
    if (!window.confirm("This will permanently delete your account and all data. Are you absolutely sure?")) return;
    try {
      await deleteAccount(token);
      logout();
      navigate("/");
    } catch {
      alert("Failed to delete account.");
    }
  };

  /* ── STAT CARDS ── */
  const STAT_CARDS = [
    { icon: <FaLeaf />, label: "Products listed", value: stats.products_listed, color: "#E8F5E9", iconColor: "#2E7D32" },
    { icon: <FaBoxOpen />, label: "Orders completed", value: stats.orders_completed, color: "#E3F2FD", iconColor: "#1565C0" },
    { icon: <FaStar />, label: "Customer rating", value: stats.rating > 0 ? `${stats.rating} ⭐` : "No ratings yet", color: "#FFF8E1", iconColor: "#F9A825" },
    { icon: <FaMoneyBillWave />, label: "Total earnings", value: `${stats.total_earnings.toLocaleString()} FCFA`, color: "#F3E5F5", iconColor: "#6A1B9A" },
  ];

  const memberSince = formatMemberSince(user?.created_at);

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="pr-loading">
        <div className="pr-spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  /* ── UI ── */
  return (
    <div className="pr-page">

      {/* ── HERO BANNER ── */}
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

      <div className="pr-container">

        {/* ── MAIN CARD ── */}
        <div className="pr-main-card">
          <div className="pr-profile-top">

            {/* AVATAR */}
            <div
              className="pr-avatar-wrap"
              onClick={() => avatarInputRef.current?.click()}
              title="Click to change photo"
            >
              {avatar ? (
                <img src={avatar} alt="Profile" className="pr-avatar" />
              ) : (
                <div className="pr-avatar-placeholder">
                  <FaUser size={32} color="#aaa" />
                </div>
              )}
              <div className={`pr-avatar-overlay ${avatarLoading ? "pr-avatar-loading" : ""}`}>
                {avatarLoading
                  ? <div className="pr-avatar-spinner" />
                  : <><FaCamera size={14} /><span>Change photo</span></>
                }
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>

            {/* IDENTITY */}
            <div className="pr-identity">
              {!editMode ? (
                <>
                  <div className="pr-name-row">
                    <h2>{user?.full_name || "—"}</h2>
                    <span className="pr-verified-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#2E7D32">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified Farmer
                    </span>
                  </div>
                  <div className="pr-meta">
                    <span><FaMapMarkerAlt size={11} /> {user?.location || "—"}</span>
                    <span><FaPhone size={11} /> {user?.phone || "—"}</span>
                    <span><FaEnvelope size={11} /> {user?.email || "—"}</span>
                  </div>
                  <p className="pr-bio">
                    Passionate farmer dedicated to sustainable agriculture and providing fresh quality produce.
                  </p>
                </>
              ) : (
                <div className="pr-edit-form">
                  <div className="pr-edit-field">
                    <label>Full name *</label>
                    <input
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="pr-edit-field">
                    <label>Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="pr-edit-field">
                    <label>Phone *</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+237 600 000 000"
                    />
                  </div>
                  <div className="pr-edit-btns">
                    <button className="pr-save-btn" onClick={handleSave}>
                      <FaSave size={12} /> Save changes
                    </button>
                    <button className="pr-discard-btn" onClick={() => setEditMode(false)}>
                      <FaTimes size={12} /> Cancel
                    </button>
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

          {/* INFO + STATS */}
          <div className="pr-info-stats-grid">
            <div className="pr-info-box">
              <h3>My information</h3>
              {[
                { icon: <FaUser size={12} />, label: "Full name", val: user?.full_name || "—" },
                { icon: <FaEnvelope size={12} />, label: "Email", val: user?.email || "—" },
                { icon: <FaPhone size={12} />, label: "Phone", val: user?.phone || "—" },
                { icon: <FaMapMarkerAlt size={12} />, label: "Location", val: user?.location || "—" },
                { icon: <FaCalendarAlt size={12} />, label: "Member since", val: memberSince },
              ].map((row) => (
                <div className="pr-info-row" key={row.label}>
                  <span className="pr-info-label">{row.icon} {row.label}</span>
                  <span className="pr-info-val">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="pr-stats-box">
              <h3>Account stats</h3>
              {STAT_CARDS.map((s) => (
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

        {/* ── TABS ── */}
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

        {/* ── TAB CONTENT ── */}
        <div className="pr-tab-content">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="pr-overview-grid">
              <div className="pr-content-box">
                <h3>About me</h3>
                <p>Passionate farmer with experience in crop production. We grow fresh and organic products for local markets, prioritising sustainability and community support.</p>
                <div className="pr-overview-stats">
                  {STAT_CARDS.map((s) => (
                    <div className="pr-ov-stat" key={s.label}>
                      <span className="pr-ov-icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</span>
                      <span className="pr-ov-val">{s.value}</span>
                      <span className="pr-ov-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pr-content-box">
                <h3>Earnings overview</h3>
                <div className="pr-earnings-bars">
                  {[
                    { month: "Jan", pct: 40 }, { month: "Feb", pct: 65 },
                    { month: "Mar", pct: 50 }, { month: "Apr", pct: 80 },
                    { month: "May", pct: 60 }, { month: "Jun", pct: 90 },
                  ].map((b) => (
                    <div className="pr-bar-wrap" key={b.month}>
                      <div className="pr-bar" style={{ height: `${b.pct}%` }} />
                      <span>{b.month}</span>
                    </div>
                  ))}
                </div>
                <p className="pr-earnings-total">
                  Total: <strong>{stats.total_earnings.toLocaleString()} FCFA</strong>
                </p>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === "products" && (
            <div>
              <div className="pr-section-header">
                <h3>My listings <span className="pr-section-count">({products.length})</span></h3>
                <button className="pr-add-btn" onClick={() => navigate("/upload-product")}>+ Add product</button>
              </div>
              {products.length === 0 ? (
                <div className="pr-empty-state">
                  <FaLeaf size={32} color="#ccc" />
                  <p>You haven't listed any products yet.</p>
                  <button className="pr-add-btn" onClick={() => navigate("/upload-product")}>
                    Upload your first product
                  </button>
                </div>
              ) : (
                <div className="pr-listings-grid">
                  {products.map((item) => (
                    <div className="pr-listing-card" key={item.id}>
                      {item.image ? (
                        <img src={`${API_BASE}${item.image}`} alt={item.name} className="pr-listing-img" />
                      ) : (
                        <div className="pr-listing-emoji" style={{ background: "#f0faf0" }}>🌿</div>
                      )}
                      <div className="pr-listing-info">
                        <span className="pr-listing-name">{item.name}</span>
                        <span className="pr-listing-cat">{item.subcategory || item.category}</span>
                        <span className="pr-listing-price">FCFA {item.price.toLocaleString()} / {item.unit}</span>
                        <span className="pr-listing-stock">Stock: {item.stock_quantity} {item.unit}</span>
                        <span className={`pr-status-badge ${
                          item.status === "active" || item.status === "public"
                            ? "pr-active-badge"
                            : "pr-draft-badge"
                        }`}>
                          {item.status === "active" || item.status === "public" ? "Active" : "Draft"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <div className="pr-content-box">
              <h3>My orders <span className="pr-section-count">({orders.length})</span></h3>
              {orders.length === 0 ? (
                <div className="pr-empty-state">
                  <FaShoppingBag size={32} color="#ccc" />
                  <p>No orders yet.</p>
                </div>
              ) : (
                <table className="pr-orders-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.product_name}</td>
                        <td>{order.quantity} {order.unit}</td>
                        <td>{order.total_amount.toLocaleString()} FCFA</td>
                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        <td>
                          <span className={`pr-order-status pr-status-${order.status}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="pr-settings-layout">

              {/* CHANGE PASSWORD */}
              <div className="pr-settings-card">
                <div className="pr-settings-card-title">
                  <FaLock size={14} color="#2E7D32" /> Change password
                </div>
                <div className="pr-settings-fields">
                  {(["current", "newPw", "confirm"] as const).map((key) => (
                    <div className="pr-settings-field" key={key}>
                      <label>
                        {key === "current"
                          ? "Current password"
                          : key === "newPw"
                          ? "New password"
                          : "Confirm new password"}
                      </label>
                      <div className="pr-pw-wrap">
                        <input
                          type={showPw[key] ? "text" : "password"}
                          value={pwForm[key]}
                          onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                          placeholder="••••••••"
                        />
                        <button
                          className="pr-pw-toggle"
                          type="button"
                          onClick={() => setShowPw({ ...showPw, [key]: !showPw[key] })}
                        >
                          {showPw[key] ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="pr-settings-save-btn"
                    onClick={handleChangePassword}
                    disabled={pwLoading}
                  >
                    {pwLoading ? "Saving..." : "Update password"}
                  </button>
                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div className="pr-settings-card">
                <div className="pr-settings-card-title">
                  <FaBell size={14} color="#2E7D32" /> Notification preferences
                </div>
                <div className="pr-notif-list">
                  {([
                    { key: "orders", label: "Order updates", desc: "Get notified when your order status changes" },
                    { key: "promotions", label: "Promotions", desc: "Receive special deals and discount offers" },
                    { key: "newsletter", label: "Newsletter", desc: "Weekly farming tips and market news" },
                    { key: "sms", label: "SMS alerts", desc: "Receive important alerts via SMS" },
                  ] as const).map(({ key, label, desc }) => (
                    <div className="pr-notif-row" key={key}>
                      <div>
                        <span className="pr-notif-label">{label}</span>
                        <span className="pr-notif-desc">{desc}</span>
                      </div>
                      <button
                        className={`pr-toggle ${notifications[key] ? "pr-toggle-on" : ""}`}
                        onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                      >
                        {notifications[key] ? <FaToggleOn size={26} /> : <FaToggleOff size={26} />}
                      </button>
                    </div>
                  ))}
                </div>
                <button className="pr-settings-save-btn" onClick={handleSaveNotifications}>
                  Save preferences
                </button>
              </div>

              {/* PRIVACY */}
              <div className="pr-settings-card">
                <div className="pr-settings-card-title">
                  <FaShieldAlt size={14} color="#2E7D32" /> Privacy &amp; verification
                </div>
                <p className="pr-settings-desc">
                  Verify your identity to unlock the full marketplace experience and build buyer trust.
                </p>
                <button className="pr-verify-btn">Start verification</button>
              </div>

              {/* DANGER ZONE */}
              <div className="pr-settings-card pr-danger-card">
                <div className="pr-settings-card-title">
                  <FaTrash size={14} color="#e53935" /> Delete account
                </div>
                <p className="pr-settings-desc">
                  This action is <strong>permanent</strong> and cannot be undone. All your products,
                  orders, and data will be deleted. Type your email to confirm.
                </p>
                <div className="pr-settings-field">
                  <label>Type <strong>{user?.email}</strong> to confirm</label>
                  <input
                    type="email"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder={user?.email || "your@email.com"}
                    className="pr-danger-input"
                  />
                </div>
                <button
                  className="pr-delete-btn"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== user?.email}
                >
                  <FaTrash size={12} /> Permanently delete my account
                </button>
              </div>

              {/* SIGN OUT */}
              <div className="pr-settings-card">
                <div className="pr-settings-card-title">
                  <FaSignOutAlt size={14} color="#2E7D32" /> Sign out
                </div>
                <p className="pr-settings-desc">
                  You'll be returned to the login page. Your data stays safe.
                </p>
                <button
                  className="pr-settings-save-btn"
                  onClick={() => { logout(); navigate("/login"); }}
                >
                  Sign out of AgroConnect
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Hero;
