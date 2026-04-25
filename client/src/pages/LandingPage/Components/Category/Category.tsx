import React from "react";
import "../Category/Category.css";
import cropsImg from "../../../../assets/crops.webp";
import animalsImg from "../../../../assets/animals.webp";
import machinesImg from "../../../../assets/machines.jpg";
import servicesImg from "../../../../assets/service.png";
import trainingImg from "../../../../assets/training.jpg";
import medicalImg from "../../../../assets/medicine.jpg";

import {
  FaSeedling,
  FaCrow,
  FaTractor,
  FaTools,
  FaChalkboardTeacher,
  FaMedkit,
} from "react-icons/fa";

const categories = [
  {
    title: "Crops",
    desc: "Maize, tomatoes, cassava and more",
    icon: <FaSeedling />,
    image: cropsImg,

  },
  {
    title: "Animals",
    desc: "Livestock & poultry",
    icon: <FaCrow />,
    image: animalsImg,

  },
  {
    title: "Machines",
    desc: "Tractors, tools & rentals",
    icon: <FaTractor />,
    image: machinesImg,

  },
  {
    title: "Services",
    desc: "Farm services & support",
    icon: <FaTools />,
    image: servicesImg,
  },
  {
    title: "Training",
    desc: "Workshops & farm education",
    icon: <FaChalkboardTeacher />,
    image: trainingImg,
  },
  {
    title: "Medicals",
    desc: "Vet drugs & farm chemicals",
    icon: <FaMedkit />,
    image: medicalImg,
  },
];

const Category: React.FC = () => {
  return (
    <section className="category-section">
      <h2 className="category-title">Browse Categories</h2>

      <div className="category-grid">
  {categories.map((cat, index) => (
    <div
      key={index}
      className="category-card"
      style={{ backgroundImage: `url(${cat.image})` }}
    >
      <div className="category-overlay">
        <div className="category-icon">{cat.icon}</div>
        <h3>{cat.title}</h3>
        <p>{cat.desc}</p>
      </div>
    </div>
  ))}
</div>
    </section>
  );
};

export default Category;