import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const FOOTER_LINKS = [
  { label: "Home", path: "/landing" },
  { label: "About Us", path: "/about" },
  { label: "Marketplace", path: "/market" },
  { label: "Dashboard", path: "/dashboard" },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div className="app-footer-brand">
          <div className="app-footer-logo">
            <FaLeaf size={20} />
            <span>AgroConnect</span>
          </div>
          <p>Connecting Cameroonian farmers and buyers with a simple, trustworthy digital marketplace.</p>
        </div>

        <div className="app-footer-col">
          <h4>Quick Links</h4>
          <ul>
            {FOOTER_LINKS.map((link) => (
              <li key={link.path} onClick={() => navigate(link.path)}>{link.label}</li>
            ))}
          </ul>
        </div>

        <div className="app-footer-col">
          <h4>Contact</h4>
          <ul className="app-footer-contact">
            <li><FaEnvelope /> support@agroconnect.cm</li>
            <li><FaPhone /> +237 677 41 42 52</li>
            <li><FaMapMarkerAlt /> Yaoundé, Cameroon</li>
          </ul>
        </div>
      </div>

      <div className="app-footer-bottom">
        <span>© {new Date().getFullYear()} AgroConnect Cameroon. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
