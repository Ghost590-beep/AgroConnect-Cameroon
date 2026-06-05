import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import "./Hero.css";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="ln-hero">
      <div className="ln-hero-bg" />
      <div className="ln-hero-content">
        <span className="ln-hero-badge">🌿 Your digital partner in agriculture</span>
        <h1 className="ln-hero-title">
          Connect. <span className="ln-hero-accent">Grow.</span><br />Thrive.
        </h1>
        <p className="ln-hero-sub">
          The #1 agricultural marketplace in Cameroon. Buy, sell and rent crops,
          animals, machines and more — all in one place.
        </p>
        <div className="ln-hero-btns">
          <button className="ln-hero-btn-solid" onClick={() => navigate("/market")}>
            <FaShoppingCart size={14} /> Browse Market
          </button>
          <button className="ln-hero-btn-outline" onClick={() => navigate("/register")}>
            Get Started Free
          </button>
        </div>
        <a href="#categories" className="ln-scroll-hint">
          <FaChevronDown size={16} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
