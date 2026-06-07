import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import tomatoes from "../../../../assets/tomatoes.webp";
import poultry from "../../../../assets/poultry.jpg";
import corn from "../../../../assets/corn.webp";
import rice from "../../../../assets/rice.webp";
import potatoes from "../../../../assets/potatoes.webp";
import fertilizer from "../../../../assets/fertilizer.webp";
import onions from "../../../../assets/onions.webp";
import cassava from "../../../../assets/cassava.webp";
import wheat from "../../../../assets/wheat.webp";
import milk from "../../../../assets/milk.webp";
import "./Feature.css";

const products = [
  { name: "Fresh Tomatoes", price: 3000,  unit: "Basket", location: "Yaoundé",    category: "Crops & Seeds", img: tomatoes   },
  { name: "Poultry Feed",   price: 18000, unit: "Bag",    location: "Douala",      category: "Animals",       img: poultry    },
  { name: "Corn",           price: 12000, unit: "Bag",    location: "Bafoussam",   category: "Crops & Seeds", img: corn       },
  { name: "Rice",           price: 25000, unit: "Bag",    location: "Bamenda",     category: "Crops & Seeds", img: rice       },
  { name: "Potatoes",       price: 9000,  unit: "Bag",    location: "Yaoundé",     category: "Crops & Seeds", img: potatoes   },
  { name: "Fertilizer",     price: 22000, unit: "Bag",    location: "Douala",      category: "Medications",   img: fertilizer },
  { name: "Onions",         price: 8000,  unit: "Bag",    location: "Garoua",      category: "Crops & Seeds", img: onions     },
  { name: "Cassava",        price: 3500,  unit: "Bag",    location: "Ebolowa",     category: "Crops & Seeds", img: cassava    },
  { name: "Wheat",          price: 6000,  unit: "Bag",    location: "Ngaoundéré",  category: "Crops & Seeds", img: wheat      },
  { name: "Milk",           price: 2000,  unit: "Litre",  location: "Bafoussam",   category: "Animals",       img: milk       },
];

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="fp-section">
      <div className="fp-header">
        <div>
          <h2>Featured <span className="fp-accent">Products</span></h2>
          <p>Fresh picks from farmers across Cameroon</p>
        </div>
        <button className="fp-see-all" onClick={() => navigate("/market")}>
          See all products <FaArrowRight size={12} />
        </button>
      </div>

      <div className="fp-grid">
        {products.map((product, index) => (
          <div className="fp-card" key={index}>
            <div className="fp-img-wrap">
              <img src={product.img} alt={product.name} className="fp-img" />
              <span className="fp-badge">{product.category}</span>
            </div>
            <div className="fp-body">
              <h3 className="fp-name">{product.name}</h3>
              <p className="fp-location">
                <FaMapMarkerAlt size={10} /> {product.location}
              </p>
              <div className="fp-price-row">
                <span className="fp-price">XAF {product.price.toLocaleString()}</span>
                <span className="fp-unit">/ {product.unit}</span>
              </div>
              <div className="fp-btns">
                <button
                  className="fp-view-btn"
                  onClick={() => navigate("/market")}
                >
                  View details
                </button>
                <button className="fp-cart-btn">
                  <FaShoppingCart size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
