import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header/Header.css";
import Logo from "../../../../assets/logo (3).png";
import { FaSearch, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="header">
      {/* Logo */}
      <img src={Logo} alt="Logo" className="Logo" />

      {/* Navigation */}
      <ul className="header-menu">
        <li  onClick={() => navigate("/landing")}>Dashbaord</li>
        <li onClick={() => navigate("/market")}>MarketPlace</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/contact")}>Contact</li>
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
  );
};

export default Header;
