import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/validtors";
import { API_BASE } from "../../utils/constants";
import { FaLeaf, FaSearch, FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

interface NavbarProps {
  variant?: "full" | "minimal";
}

const Navbar: React.FC<NavbarProps> = ({ variant = "full" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, logout, isAuthenticated } = useAuth();
  const initials = getInitials(authUser?.full_name);
  const avatarSrc = authUser?.profile_image
    ? authUser.profile_image.startsWith("data:")
      ? authUser.profile_image
      : `${API_BASE}${authUser.profile_image}`
    : null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/landing" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Marketplace", path: "/market" },
    { label: "Profile", path: "/profile" },
    { label: "About", path: "/about" },
  ];

  if (variant === "minimal") {
    return (
      <nav className="app-nav app-nav-minimal">
        <div className="app-nav-inner">
          <div className="app-nav-brand" onClick={() => navigate("/landing")}>
            <FaLeaf size={20} />
            <span>AgroConnect</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`app-nav ${scrolled ? "app-nav-scrolled" : ""}`}>
      <div className="app-nav-inner">
        <div className="app-nav-brand" onClick={() => navigate("/landing")}>
          <FaLeaf size={20} />
          <span>AgroConnect</span>
        </div>

        <ul className={`app-nav-links ${menuOpen ? "app-nav-open" : ""}`}>
          {navLinks.map((link) => (
            <li
              key={link.path}
              className={location.pathname === link.path ? "app-nav-active" : ""}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
            >
              {link.label}
            </li>
          ))}
        </ul>

        <div className="app-nav-right">
          <button className="app-search-btn" onClick={() => setSearchOpen(!searchOpen)}>
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </button>

          {isAuthenticated ? (
            <div className="app-avatar-menu">
              <div className="app-avatar-chip" onClick={() => navigate("/profile")} title="Profile">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" />
                  : <span>{initials}</span>}
              </div>
              <button className="app-logout-btn" onClick={() => { logout(); navigate("/login"); }}>
                <FaSignOutAlt size={13} /> Logout
              </button>
            </div>
          ) : (
            <div className="app-auth-btns">
              <button className="app-btn-outline" onClick={() => navigate("/login")}>Log in</button>
              <button className="app-btn-solid" onClick={() => navigate("/register")}>Sign up</button>
            </div>
          )}

          <button className="app-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="app-search-bar">
          <FaSearch size={14} />
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
