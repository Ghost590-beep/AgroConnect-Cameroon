import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { getInitials } from "../../../../utils/validtors";
import { API_BASE } from "../../../../utils/constants";
import { FaLeaf, FaSearch, FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user: authUser, logout, isAuthenticated } = useAuth();
  const initials = getInitials(authUser?.full_name);
  const avatarSrc = authUser?.profile_image ? `${API_BASE}${authUser.profile_image}` : null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`ln-nav ${scrolled ? "ln-nav-scrolled" : ""}`}>
      <div className="ln-nav-inner">
        <div className="ln-nav-brand">
          <FaLeaf size={20} color="#4caf50" />
          <span>AgroConnect</span>
        </div>

        <ul className={`ln-nav-links ${menuOpen ? "ln-nav-open" : ""}`}>
          <li onClick={() => navigate("/landing")}>Home</li>
          <li onClick={() => navigate("/market")}>Marketplace</li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="ln-nav-right">
          <button className="ln-search-btn" onClick={() => setSearchOpen(!searchOpen)}>
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </button>

          {isAuthenticated ? (
            <div className="ln-avatar-menu">
              <div className="ln-avatar-chip" onClick={() => navigate("/profile")} title="Profile">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" />
                  : <span>{initials}</span>}
              </div>
              <button className="ln-logout-btn" onClick={() => { logout(); navigate("/login"); }}>
                <FaSignOutAlt size={13} /> Logout
              </button>
            </div>
          ) : (
            <div className="ln-auth-btns">
              <button className="ln-btn-outline" onClick={() => navigate("/login")}>Log in</button>
              <button className="ln-btn-solid" onClick={() => navigate("/register")}>Sign up</button>
            </div>
          )}

          <button className="ln-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="ln-search-bar">
          <FaSearch size={14} color="#888" />
          <input
            type="text"
            placeholder="Search crops, animals, machines..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") { navigate("/market"); setSearchOpen(false); }
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
