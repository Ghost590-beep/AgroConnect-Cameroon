import React, { useState } from "react";
import Logo from "../../../../assets/logo (3).png";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Heros.css";
import profil_image from "../../../../assets/animals.webp";

/* ✅ Main component */
const Hero: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="heros-container">
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="Logo" />

        {/* Navigation */}
        <ul className="header-menu">
          <li>Dashboard</li>
          <li>Marketplace</li>
          <li>About</li>
          <li>Profile</li>
          <li>Contact</li>
        </ul>

        {/* Right side */}
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

        {/* Search bar */}
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
          />

          <div className="profile-details">
            <h2>
              John Mbarga <span className="verified">✔ Verified Farmer</span>
            </h2>
            <p>Bafoussam, West Region, Cameroon</p>
            <p>📞 +237 675 43 21 98</p>
            <p>✉ johnmbarga@gmail.com</p>
            <p>Joined: March 2024</p>
          </div>

          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
