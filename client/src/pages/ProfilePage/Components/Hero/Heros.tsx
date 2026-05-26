import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Logo from "../../../../assets/logo (3).png";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Heros.css";
import profil_image from "../../../../assets/default-user.png";
import axios from "axios";

/* ✅ Types */
interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  location: string;
}

/* ✅ Main component */
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    location: "",
  });

  /* ───────────────────────────────
     FETCH USER PROFILE
  ─────────────────────────────── */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };

    fetchUser();
  }, []);

  /* ───────────────────────────────
     EDIT HANDLERS
  ─────────────────────────────── */
  const handleEditClick = () => {
    if (!user) return;

    setForm({
      full_name: user.full_name,
      phone: user.phone,
      location: user.location,
    });

    setEditMode(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/user/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully");

      setEditMode(false);

      // refresh user data
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="heros-container">
      {/* Header */}
      <div className="header">
        <img src={Logo} alt="Logo" className="Logo" />

        <ul className="header-menu">
          <li onClick={() => navigate("/landing")}>Dashboard</li>
          <li onClick={() => navigate("/market")}>Marketplace</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        <div className="header-right">
          <div
            className="search-icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <FaTimes /> : <FaSearch />}
            <span className="notification-dot"></span>
          </div>

          <button className="btn sign-in">Sign In</button>
          <button className="btn login">Login</button>
        </div>

        {searchOpen && (
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-bg"></div>

        <div className="profile-content">
          <img
            src={profil_image}
            className="profile-photo"
            alt="profile"
          />

          {/* ───────── PROFILE INFO ───────── */}
          {!editMode ? (
            <div className="profile-details">
              <h2>
                {user?.full_name}{" "}
                <span className="verified">
                  ✔ Verified Farmer
                </span>
              </h2>

              <p>{user?.location}</p>
              <p>📞 {user?.phone}</p>
              <p>✉ {user?.email}</p>
              <p>Joined: March 2026</p>
            </div>
          ) : (
            /* ───────── EDIT MODE ───────── */
            <div className="profile-details">
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
          )}

          {/* ───────── BUTTONS ───────── */}
          {!editMode ? (
            <button
              className="edit-btn"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="edit-btn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="edit-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default Hero;