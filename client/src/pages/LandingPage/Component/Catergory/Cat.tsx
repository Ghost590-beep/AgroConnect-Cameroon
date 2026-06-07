import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSeedling, FaCrow, FaTractor,
  FaHandshake, FaCapsules, FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";
import "./Cat.css";

const CATEGORIES = [
  { title: "Crops & Seeds",    desc: "Maize, tomatoes, cassava and more", icon: <FaSeedling />,        bg: "#e8f5e9" },
  { title: "Animals",          desc: "Livestock & poultry",               icon: <FaCrow />,            bg: "#fff8e1" },
  { title: "Machines & Tools", desc: "Tractors, tools & rentals",         icon: <FaTractor />,         bg: "#e3f2fd" },
  { title: "Services",         desc: "Farm services & support",           icon: <FaHandshake />,       bg: "#fce4ec" },
  { title: "Medications",      desc: "Vet drugs & farm chemicals",        icon: <FaCapsules />,        bg: "#f3e5f5" },
  { title: "Training",         desc: "Workshops & farm education",        icon: <FaChalkboardTeacher />, bg: "#e0f7fa" },
];

const CategoriesHow: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* CATEGORIES */}
      <section className="ln-categories" id="categories">
        <div className="ln-section-header">
          <h2>Browse <span className="ln-accent">Categories</span></h2>
          <p>Discover everything the agricultural market has to offer</p>
        </div>
        <div className="ln-cat-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="ln-cat-card"
              style={{ background: cat.bg }}
              onClick={() => navigate("/market")}
            >
              <div className="ln-cat-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <span className="ln-cat-arrow"><FaArrowRight size={12} /></span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ln-how" id="about">
        <div className="ln-section-header">
          <h2>How It <span className="ln-accent">Works</span></h2>
          <p>Three simple steps to start buying or selling</p>
        </div>
        <div className="ln-steps">
          {[
            { n: "01", title: "Create an account",        text: "Sign up for free and set up your profile in minutes.",                         action: () => navigate("/register"),       label: "Sign up now" },
            { n: "02", title: "List or browse products",  text: "Upload your products or browse thousands of listings.",                         action: () => navigate("/upload-product"), label: "Upload product" },
            { n: "03", title: "Buy or sell",              text: "Connect with buyers or sellers and complete your transaction safely.",           action: () => navigate("/market"),         label: "Go to market" },
          ].map((step) => (
            <div className="ln-step" key={step.n}>
              <span className="ln-step-num">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <button className="ln-step-btn" onClick={step.action}>
                {step.label} <FaArrowRight size={11} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoriesHow;
