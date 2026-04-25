import React from "react";
import "../Requirement/Require.css";

import tomatoes from "../../../../assets/tomatoes.webp";
import poultry from "../../../../assets/poultry.jpg";
import corn from "../../../../assets/corn.webp";
import rice from "../../../../assets/rice.webp";
import potatoes from "../../../../assets/potatoes.webp";
import fertilizer from "../../../../assets/fertilizer.webp";
import onions from "../../../../assets/onions.webp";

const products = [
  { name: "Fresh Tomatoes", price: "3,000 FCFA / Basket", img: tomatoes },
  { name: "Poultry Feed", price: "18,000 FCFA / Bag", img: poultry },
  { name: "Corn", price: "12,000 FCFA / Bag", img: corn },
  { name: "Rice", price: "25,000 FCFA / Bag", img: rice },
  { name: "Potatoes", price: "9,000 FCFA / Bag", img: potatoes },
  { name: "Fertilizer", price: "22,000 FCFA / Bag", img: fertilizer },
  { name: "Onions", price: "8,000 FCFA / Bag", img: onions },
];

const Require: React.FC = () => {
  return (
    <div className="Require">
      <div className="require-container">

        {/* HEADER */}
        <div className="programs-header" style={{ gap: "2rem" }}>
          <span>RECOMMENDED</span>
          <span>FOR</span>
          <span>YOU</span>
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">
          {products.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.img} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <button>View Product</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Require;