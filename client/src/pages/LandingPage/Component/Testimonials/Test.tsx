import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar, FaLeaf, FaFacebook, FaTwitter,
  FaInstagram, FaWhatsapp, FaMapMarkerAlt,
  FaPhone, FaEnvelope,
} from "react-icons/fa";
import "./Test.css";

const TESTIMONIALS = [
  { name: "Marie Nkeng",  role: "Farmer, Yaoundé",    text: "AgroConnect helped me reach buyers across Cameroon. My sales tripled in 3 months!", stars: 5 },
  { name: "Paul Biya Jr.", role: "Buyer, Douala",     text: "I find fresh produce at the best prices. The delivery is always on time.",            stars: 5 },
  { name: "Fatima Sali",  role: "Trader, Bafoussam",  text: "The platform is easy to use. I listed my products and got orders the same day.",     stars: 4 },
];

const TestimonialsJoinFooter: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert(`Thanks! We'll be in touch at ${email}`);
    setEmail("");
  };

  return (
    <>
      {/* TESTIMONIALS */}
      <section className="ln-testimonials">
        <div className="ln-section-header">
          <h2>What Our <span className="ln-accent">Community</span> Says</h2>
          <p>Real stories from farmers and buyers across Cameroon</p>
        </div>
        <div className="ln-testi-grid">
          {TESTIMONIALS.map((t) => (
            <div className="ln-testi-card" key={t.name}>
              <div className="ln-testi-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <FaStar key={i} size={13} color="#f9a825" />
                ))}
              </div>
              <p className="ln-testi-text">"{t.text}"</p>
              <div className="ln-testi-author">
                <div className="ln-testi-avatar">{t.name[0]}</div>
                <div>
                  <span className="ln-testi-name">{t.name}</span>
                  <span className="ln-testi-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="ln-join">
        <div className="ln-join-inner">
          <h2>Ready to <span className="ln-accent-light">Grow</span> Your Business?</h2>
          <p>Join thousands of farmers and buyers already on AgroConnect.</p>
          <form className="ln-join-form" onSubmit={handleJoin}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Join Now</button>
          </form>
          <div className="ln-join-btns">
            <button className="ln-join-solid" onClick={() => navigate("/register")}>
              Create free account
            </button>
            <button className="ln-join-outline" onClick={() => navigate("/market")}>
              Browse marketplace
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ln-footer" id="contact">
        <div className="ln-footer-inner">
          <div className="ln-footer-brand">
            <div className="ln-brand-row">
              <FaLeaf color="#4caf50" size={18} />
              <span>AgroConnect</span>
            </div>
            <p>Connecting farmers with the community for a stronger agricultural future.</p>
            <div className="ln-socials">
              <FaFacebook /><FaTwitter /><FaInstagram /><FaWhatsapp />
            </div>
          </div>
          <div className="ln-footer-col">
            <h4>Quick links</h4>
            <ul>
              <li onClick={() => navigate("/landing")}>Home</li>
              <li onClick={() => navigate("/market")}>Marketplace</li>
              <li onClick={() => navigate("/upload-product")}>Sell a product</li>
              <li onClick={() => navigate("/register")}>Register</li>
            </ul>
          </div>
          <div className="ln-footer-col">
            <h4>Categories</h4>
            <ul>
              <li>Crops & Seeds</li>
              <li>Animals</li>
              <li>Machines & Tools</li>
              <li>Services</li>
              <li>Medications</li>
            </ul>
          </div>
          <div className="ln-footer-col">
            <h4>Contact info</h4>
            <div className="ln-contact-row"><FaMapMarkerAlt size={11} /> Yaoundé, Cameroon</div>
            <div className="ln-contact-row"><FaPhone size={11} /> +237 600 000 000</div>
            <div className="ln-contact-row"><FaEnvelope size={11} /> info@agroconnect.cm</div>
          </div>
        </div>
        <div className="ln-footer-bottom">
          <span>© 2025 AgroConnect. All rights reserved.</span>
          <FaLeaf color="#4caf50" size={14} />
        </div>
      </footer>
    </>
  );
};

export default TestimonialsJoinFooter;
