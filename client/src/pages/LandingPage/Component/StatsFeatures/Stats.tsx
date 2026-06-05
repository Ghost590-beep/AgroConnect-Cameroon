import React from "react";
import { FaShieldAlt, FaLeaf, FaTruck, FaHeadset } from "react-icons/fa";
import "./Stats.css";

const STATS = [
  { value: "50,000+", label: "Farmers" },
  { value: "12,000+", label: "Products" },
  { value: "3,200+", label: "Buyers" },
  { value: "98%",    label: "Satisfaction" },
];

const FEATURES = [
  { icon: <FaShieldAlt />, title: "Safe & Secure",     text: "Protected transactions every time" },
  { icon: <FaLeaf />,      title: "Quality Products",  text: "From trusted local farmers" },
  { icon: <FaTruck />,     title: "Fast Delivery",     text: "Quick and reliable delivery" },
  { icon: <FaHeadset />,   title: "24/7 Support",      text: "We are here to help you" },
];

const StatsFeatures: React.FC = () => (
  <>
    {/* STATS */}
    <section className="ln-stats">
      {STATS.map((s) => (
        <div className="ln-stat" key={s.label}>
          <span className="ln-stat-value">{s.value}</span>
          <span className="ln-stat-label">{s.label}</span>
        </div>
      ))}
    </section>

    {/* FEATURES */}
    <section className="ln-features">
      {FEATURES.map((f) => (
        <div className="ln-feature-card" key={f.title}>
          <span className="ln-feat-icon">{f.icon}</span>
          <div>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        </div>
      ))}
    </section>
  </>
);

export default StatsFeatures;
