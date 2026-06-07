import React from "react";
import { FaLeaf, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../../../assets/logo (3).png";
import "../MarketFooter/MarketFooter.css";

interface Props {
  onNavigate: (path: string) => void;
}

const MarketFooter: React.FC<Props> = ({ onNavigate }) => (
  <footer className="hm-footer">
    <div className="hm-footer-inner">
      <div className="hm-footer-brand">
        <div className="hm-brand-row">
          <img src={Logo} alt="Logo" className="hm-logo" />
        </div>
        <p>Connecting farmers with the community for a stronger agricultural future.</p>
        <div className="hm-socials">
          <FaFacebook /><FaTwitter /><FaInstagram /><FaWhatsapp />
        </div>
      </div>
      <div className="hm-footer-col">
        <h4>Quick links</h4>
        <ul>
          <li onClick={() => onNavigate("/landing")}>Home</li>
          <li onClick={() => onNavigate("/market")}>Marketplace</li>
          <li>About Us</li>
          <li onClick={() => onNavigate("/contact")}>Contact</li>
        </ul>
      </div>
      <div className="hm-footer-col">
        <h4>Categories</h4>
        <ul>
          <li>Crops & Seeds</li>
          <li>Animals</li>
          <li>Machines & Tools</li>
          <li>Services</li>
          <li>Medications</li>
        </ul>
      </div>
      <div className="hm-footer-col">
        <h4>Contact info</h4>
        <div className="hm-contact-row"><FaMapMarkerAlt size={11} /> Yaoundé, Cameroon</div>
        <div className="hm-contact-row"><FaPhone size={11} /> +237 600 000 000</div>
        <div className="hm-contact-row"><FaEnvelope size={11} /> info@agroconnect.cm</div>
      </div>
    </div>
    <div className="hm-footer-bottom">
      <span>© 2025 AgroConnect. All rights reserved.</span>
      <FaLeaf color="var(--accent-dark)" size={15} />
    </div>
  </footer>
);

export default MarketFooter;